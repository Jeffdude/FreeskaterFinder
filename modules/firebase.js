import { syncTestList } from '../redux/actions.js';
import { testListSelector } from '../redux/selectors.js';


import firebaseConfig from '../secure/firebase_config.js';

export var firebase = require('firebase');
require('firebase/auth');
//
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const testlist_path = '/testlist';

function pushToDB(db_path, store_selector){
  
}
