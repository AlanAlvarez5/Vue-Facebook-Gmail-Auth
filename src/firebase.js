const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');


const firebaseConfig = {
    apiKey: "AIzaSyBaOXQQUG16D9kOy1Pl9Wu_OQdOaFh9TSo",
    authDomain: "vue-facebook--auth.firebaseapp.com",
    databaseURL: "https://vue-facebook--auth.firebaseio.com",
    projectId: "vue-facebook--auth",
    storageBucket: "vue-facebook--auth.appspot.com",
    messagingSenderId: "535258241686",
    appId: "1:535258241686:web:2b7aa0b405651d789380b7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, db, auth, storage}