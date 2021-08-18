import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Main from './screens/main/Main';
import { FirebaseAppProvider } from "reactfire";

var firebaseConfig = {
  apiKey: "AIzaSyBNY-M24aspyJ32qUJe20D1ksDMD8svG-I",
  authDomain: "bugsmanager-9d88c.firebaseapp.com",
  projectId: "bugsmanager-9d88c",
  storageBucket: "bugsmanager-9d88c.appspot.com",
  messagingSenderId: "713493432003",
  appId: "1:713493432003:web:bc92bbec81935c39fc8476",
  measurementId: "G-SVKKNCC5D0"
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Main />
      {/* <App /> */}
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
