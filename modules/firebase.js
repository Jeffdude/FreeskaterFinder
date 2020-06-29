import firebaseConfig from '../secure/firebase_config.js';

export var firebase = require('firebase');
require('firebase/auth');
//
//export var firebaseui = require('firebaseui');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
//var ui = new firebaseui.auth.AuthUI(firebase.auth());

//ui.start('#firebaseui-auth-container', {
//  signInOptions: [
//    firebase.auth.EmailAuthProvider.PROVIDER_ID
//  ],
//});


