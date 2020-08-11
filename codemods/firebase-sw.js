const path = require('path')
const { promises: fs } = require('fs')
const getClientEnvironment = require('react-scripts/config/env')
const paths = require('react-scripts/config/paths')
const j = require('jscodeshift')
const {
  dependencies: { firebase },
} = require('../package.json')

const rootPath = path.join(__dirname, '..')
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1))
const envs = env.raw

async function writeFirebaseSW() {
  const source = (
    await fs.readFile(path.join(rootPath, 'src', 'config', 'firebase.js'))
  ).toString()
  const transformedSource = transform(source)
  await fs.writeFile(
    path.join(rootPath, 'build', 'firebase-messaging-sw.js'),
    transformedSource,
    {
      encoding: 'utf-8',
    }
  )
}

writeFirebaseSW()

function transform(file) {
  const root = j(file)
  const fbNode = j(root.find(j.ObjectExpression).get())
  const envVars = {}

  fbNode
    .find(j.Node, {
      type: 'Property',
    })
    .forEach(path => {
      const name = path.value.key.name
      j(path)
        .find(j.MemberExpression, {
          property: { type: 'Identifier' },
        })
        .filter(path => path.name === 'value')
        .forEach(prop => {
          envVars[name] = prop.value.property.name
        })
    })

  versionImportScripts(root)

  replaceEnvVariables(fbNode, envVars)

  return root.toSource()
}

function versionImportScripts(node) {
  node
    .find(j.CallExpression, {
      callee: {
        name: 'importScripts',
      },
    })
    .forEach(importScript => {
      let url = importScript.node.arguments[0].value
      j(importScript).replaceWith(
        j.callExpression(
          {
            type: 'Identifier',
            name: 'importScripts',
          },
          [
            {
              type: 'Literal',
              value: url.replace('{firebase-version}', firebase.slice(1)),
            },
          ]
        )
      )
    })
    .toSource()
}

function replaceEnvVariables(node, envVars) {
  node
    .find(j.Node, {
      type: 'Property',
    })
    .forEach(path => {
      j(path).replaceWith(newPath => {
        let key = newPath.value.key.name
        return j.property(
          'init',
          { type: 'Identifier', name: key },
          { type: 'Literal', value: envs[envVars[key]] || '' }
        )
      })
    })
    .toSource()
}
