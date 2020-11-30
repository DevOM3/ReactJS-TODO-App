import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDWMYEfKvC4Ivuz5-cjnTXwOPmgcOUw0IQ",
    authDomain: "todo-c7149.firebaseapp.com",
    databaseURL: "https://todo-c7149.firebaseio.com",
    projectId: "todo-c7149",
    storageBucket: "todo-c7149.appspot.com",
    messagingSenderId: "651912804063",
    appId: "1:651912804063:web:9bc1af03d1e6d9f2a9db6a",
    measurementId: "G-WJ7MFDCB7D"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

const messaging = firebase.messaging();
messaging.onMessage((payload) => {
    console.log('Message received', payload);
});

export { auth, provider, messaging };
export default db;
