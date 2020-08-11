import React from 'react'
import ReactDOM from 'react-dom'
// import firebase from 'firebase/app'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { isDev } from './config/utils'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register({
  onSuccess: () => console.log('service worker registered!'),
})

// register the firebase service worker
if (!isDev && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js', {
      scope: '/firebase-cloud-messaging-push-scope',
    })
    .then(registration => {
      console.log('Registration successful, scope is:', registration.scope)
    })
    .catch(err => {
      console.error('Service worker registration failed, error:', err)
    })
}
