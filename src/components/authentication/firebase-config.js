import firebase from 'firebase/app'
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions

const firebaseConfig = {
  apiKey: "AIzaSyBo_zMazuLSmuhnIMeNckTl2ZblHQXWva0",
  authDomain: "test-e3b45.firebaseapp.com",
  databaseURL: "https://test-e3b45-default-rtdb.firebaseio.com/",
  projectId: "test-e3b45",
  storageBucket: "test-e3b45.appspot.com",
  messagingSenderId: "195105280522",
  appId: "1:195105280522:web:fd75c7d0d3f955dea285f3",
  measurementId: "G-MEASUREMENT_ID",
};

firebase.initializeApp(firebaseConfig);

export default firebase