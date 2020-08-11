import firebase from 'firebase/app'
import 'firebase/messaging'

export const isDev = process.env.NODE_ENV === 'development'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const messaging = firebase.messaging()

export const requestPermission = async () => {
  try {
    await messaging.requestPermission()
    let token = await messaging.getToken()
    console.log({ token })
  } catch (e) {
    console.log(e)
    console.log('Unable to get permission to notify.')
  }
}
