importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./firebase-messaging-sw.js').then(registration => {
        console.log("Registration completed, scope is ", registration.scope);
    }).catch(error => {
        console.log("Service worker registration failed, error ", error);
    });
}

firebase.initializeApp({
    messagingSenderId: "651912804063",
});

const initMessaging = firebase.messaging();
