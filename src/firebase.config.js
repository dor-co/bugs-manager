import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBNY-M24aspyJ32qUJe20D1ksDMD8svG-I",
    authDomain: "bugsmanager-9d88c.firebaseapp.com",
    projectId: "bugsmanager-9d88c",
    storageBucket: "bugsmanager-9d88c.appspot.com",
    messagingSenderId: "713493432003",
    appId: "1:713493432003:web:bc92bbec81935c39fc8476",
    measurementId: "G-SVKKNCC5D0"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default db;