import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

let firebaseConfig = {
  apiKey: "AIzaSyBrzTNmAS5OX4uqQyyCQQmhlFHX9Do3X2o",
  authDomain: "financas-c1c0b.firebaseapp.com",
  projectId: "financas-c1c0b",
  storageBucket: "financas-c1c0b.appspot.com",
  messagingSenderId: "214465278379",
  appId: "1:214465278379:web:093d4ab30a629e53a9e2ee"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase