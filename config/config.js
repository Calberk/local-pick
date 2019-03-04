import firebase from 'firebase';

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDgMVXwPXFTlq8x6cZaPDsqoHeim-6HNI0",
    authDomain: "parapxl-local-picks.firebaseapp.com",
    databaseURL: "https://parapxl-local-picks.firebaseio.com",
    projectId: "parapxl-local-picks",
    storageBucket: "parapxl-local-picks.appspot.com",
    messagingSenderId: "921022708448"
  };

  firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();