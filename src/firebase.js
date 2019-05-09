// Firebase App is always required and must be first
var firebase = require("firebase/app");

// Add additional services that you want to use
require("firebase/auth");
//require("firebase/database");
require("firebase/firestore");
//require("firebase/messaging");
//require("firebase/functions");

//cctest-de2a5
var cctest_de2a5_config = {
    apiKey: "AIzaSyBzClvlZXexxH0wlAudS2VNCz-uJAVyvE8",
    authDomain: "cctest-de2a5.firebaseapp.com",
    databaseURL: "https://cctest-de2a5.firebaseio.com",
    projectId: "cctest-de2a5",
    storageBucket: "cctest-de2a5.appspot.com",
    messagingSenderId: "511544788686"
};

//hfstaging
var hfstaging_config = {
    apiKey: "AIzaSyDd7_fx_rnQBEj5X0XDDlelce7tHhnmnIM",
    authDomain: "hfstaging.firebaseapp.com",
    databaseURL: "https://hfstaging.firebaseio.com",
    projectId: "hfstaging",
    storageBucket: "hfstaging.appspot.com",
    messagingSenderId: "475291441274"
  };

let Firebase = firebase.initializeApp(cctest_de2a5_config);
export default Firebase;
