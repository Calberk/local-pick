import firebase from 'firebase';

  // Initialize Firebase
  const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "m",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };

  firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
