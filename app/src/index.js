import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
//import registerServiceWorker from './registerServiceWorker';
import './index.css';
import AppRoutes from './routes';
import {BrowserRouter as Router} from 'react-router-dom'
const config={
	apiKey: "AIzaSyA1F9rySRQ4yGuaAtHRP-BwQPBPvgultrM",
    authDomain: "test-react-c888a.firebaseapp.com",
    databaseURL: "https://test-react-c888a.firebaseio.com",
    projectId: "test-react-c888a",
    storageBucket: "test-react-c888a.appspot.com",
    messagingSenderId: "273132129204"
}
firebase.initializeApp(config);
ReactDOM.render(
	<Router>
		<AppRoutes />
	</Router>,
	 document.getElementById('root'));
//registerServiceWorker();
