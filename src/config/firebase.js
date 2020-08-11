/* eslint-disable */
importScripts(
  'https://www.gstatic.com/firebasejs/{firebase-version}/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/{firebase-version}/firebase-messaging.js'
)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
}

const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging(app)
