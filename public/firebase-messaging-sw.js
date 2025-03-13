// Import the functions you need from the SDKs you need 
importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js")





// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDe84RklRKcsesRUXZjhPT-hiCU1xUi7QU",
    authDomain: "soccer-stats-v2.firebaseapp.com",
    projectId: "soccer-stats-v2",
    storageBucket: "soccer-stats-v2.appspot.com",
    messagingSenderId: "774953573779",
    appId: "1:774953573779:web:138a97a8769f7881bc5c66",
    measurementId: "G-LZJ3X99JWS"
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging(app)
messaging.onBackgroundMessage(payload => {
    const link = payload.fcmOptions?.link || payload.data?.link
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo.png",
        data: { url: link }
    }
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    )
})