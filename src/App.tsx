import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { messaging } from './config/utils'

async function requestPermission(messaging: firebase.messaging.Messaging) {
  try {
    await messaging.requestPermission()
    let token = await messaging.getToken()
    console.log({ token })
  } catch (e) {
    console.log(e)
    console.log('Unable to get permission to notify.')
  }
}

const App: React.FC = () => {
  useEffect(() => {
    requestPermission(messaging)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
