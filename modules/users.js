import { firebase } from './firebase.js';


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("User " + user.displayName + " signed in!");
  } else {
    console.log("User is signed out.");
  }
});


/**
 * @param {string} email
 * @param {string} password
 *
 * @return {success: {bool}, message: {string}}
 */
export function createUser(email, password) {
  const auth = firebase.auth();
  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    switch(errorCode) {
      case 'auth/email-already-in-use':
        console.error(errorMessage);
        return({success: false, message: errorMessage});
      case 'auth/invalid-email':
        console.error(errorMessage);
        return({success: false, message: errorMessage});
      case 'auth/operation-not-allowed':
        console.error(errorMessage);
        return({success: false, message: errorMessage});
      case 'auth/weak-password':
        console.error(errorMessage);
        return({success: false, message: errorMessage});
    }
  });
  if (auth.currentUser !== null) {
    return({success: true, message: null});
  } else {
    return({success: false, message: 'An unkown error occurred.'});
  }
}

/**
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
          console.error(errorMessage);
          return({success: false, message: errorMessage});
        case 'auth/user-disabled':
          console.error(errorMessage);
          return({success: false, message: errorMessage});
        case 'auth/user-not-found':
          console.error(errorMessage);
          return({success: false, message: errorMessage});
        case 'auth/wrong-password':
          console.error(errorMessage);
          return({success: false, message: errorMessage});
      }
  });
  if (auth.currentUser !== null) {
    return({success: true, message: null});
  } else {
    return({success: false, message: 'An unkown error occurred.'});
  }
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
 * @return {Boolean} a user is logged in
 */
export function userLoggedIn() {
  return Boolean(firebase.auth().currentUser);
}


/**
 * @return {firebase.User}
 *  current user
 */
export function getUser() {
  return firebase.auth().currentUser;
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

