import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDIi8P1tuPgJ41M8EjHLNTEEzF0MsUZjXM",
    authDomain: "pick-up-sportz-89c6e.firebaseapp.com",
    databaseURL: "https://pick-up-sportz-89c6e.firebaseio.com",
    projectId: "pick-up-sportz-89c6e",
    storageBucket: "pick-up-sportz-89c6e.appspot.com",
    messagingSenderId: "37095191568",
    appId: "1:37095191568:web:23b1f72745c8588415c695",
    measurementId: "G-N27CJ26M7D"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;