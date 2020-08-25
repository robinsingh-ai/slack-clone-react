import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD6OLPSkbztl4l3r7XJnQXWyI5je4Q_iOQ",
  authDomain: "slack-website-clone.firebaseapp.com",
  databaseURL: "https://slack-website-clone.firebaseio.com",
  projectId: "slack-website-clone",
  storageBucket: "slack-website-clone.appspot.com",
  messagingSenderId: "358301442684",
  appId: "1:358301442684:web:4eeea57a8e15159d4fdff9",
  measurementId: "G-QN1TNKYJCX",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

const Database = firebaseapp.firestore();
const Authentication = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default Database;
export { Authentication, provider };
