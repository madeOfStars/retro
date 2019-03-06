import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCK02Z2GzLmkiVPRvBDvjcCTHZgjlB0ZIk",
    authDomain: "retro-9d871.firebaseapp.com",
    databaseURL: "https://retro-9d871.firebaseio.com",
    projectId: "retro-9d871",
    storageBucket: "retro-9d871.appspot.com",
    messagingSenderId: "725606242508"
};

firebase.initializeApp(config);

export default firebase;