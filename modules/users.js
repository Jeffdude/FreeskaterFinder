import { firebase } from './firebase.js';
import { loadUser, clearUser } from '../redux/actions.js';
import * as helpers from './helpers.js';


export function initUserListener(store){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("User", user.uid, "with email", user.email, "signed in!");
      store.dispatch(loadUser(user.displayName, user.email, user.uid));
    } else {
      console.log("User is signed out.");
      store.dispatch(clearUser());
    }
  });
}


/**
 * @param {string} email
 * @param {string} password
 *
 * @return {success: {bool}, message: {string}}
 */
export function createUser(email, password, username) {
  firebase.auth().createUserWithEmailAndPassword(email, password).then(
    function(result) {
      result.user.updateProfile({
        displayName: username,
      })
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      switch(errorCode) {
        case 'auth/email-already-in-use':
          console.log("[Create Account Error]", errorMessage);
          helpers.createAlert(errorMessage);
          return({success: false, message: errorMessage});
        case 'auth/invalid-email':
          console.log("[Create Account Error]", errorMessage);
          helpers.createAlert(errorMessage);
          return({success: false, message: errorMessage});
        case 'auth/operation-not-allowed':
          console.log("[Create Account Error]", errorMessage);
          helpers.createAlert(errorMessage);
          return({success: false, message: errorMessage});
        case 'auth/weak-password':
          console.log("[Create Account Error]", errorMessage);
          helpers.createAlert(errorMessage);
          return({success: false, message: errorMessage});
        default:
          console.log("[Create Account Error]", errorMessage);
          helpers.createAlert(errorMessage);
          return({success: false, message: errorMessage});
      }
    });
  return({success: true, message: null});
}

/*
 * @param {string} email
 * @param {string} password
 *
 * @return {success: {bool}, message: {string}}
 */
export function signInUser(email, password) {
  const auth = firebase.auth();
  auth.signInWithEmailAndPassword(email, password).catch(
    function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      switch(errorCode) {
        case 'auth/invalid-email':
          console.log("[Sign In Error]", errorMessage);
          helpers.createAlert(errorMessage);
          return({success: false, message: errorMessage});
        case 'auth/user-disabled':
          console.log("[Sign In Error]", errorMessage);
          helpers.createAlert(errorMessage);
          return({success: false, message: errorMessage});
        case 'auth/user-not-found':
          console.log("[Sign In Error]", errorMessage);
          helpers.createAlert(errorMessage);
          return({success: false, message: errorMessage});
        case 'auth/wrong-password':
          console.log("[Sign In Error]", errorMessage);
          helpers.createAlert(errorMessage);
          return({success: false, message: errorMessage});
        default:
          console.log("[Sign In Error]", errorMessage);
          helpers.createAlert(errorMessage);
          return({success: false, message: errorMessage});
      }
    }
  );
  return({success: true, message: null});
}


/**
 * Sends an email verification to the user.
 */
export function sendEmailVerification() {
  if(! firebase.auth().currentUser) {
    console.error("Email verification request to signed-out account.")
    return 1;
  }

  firebase.auth().currentUser.sendEmailVerification().then(function() {
    alert('Email Verification Sent!');
  });

  return 0;
}

export function sendPasswordReset(email) {
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    alert('Password Reset Email Sent!');
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
  });
}

/**
 * @return {int}
 *  0 on success
 */
export function signOutUser() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
    return 0;
  } else {
    console.error("Failed to sign out user that was not signed in.")
    return 1;
  }
}
