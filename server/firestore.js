// firebase config (Initial Firebase)
import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyA6hV0zE55O4khqJiXfotzOUzI4cOOHdkU",
    authDomain: "movieticketmachine-patchara.firebaseapp.com",
    databaseURL: "https://movieticketmachine-patchara.firebaseio.com",
    projectId: "movieticketmachine-patchara",
    storageBucket: "movieticketmachine-patchara.appspot.com",
    messagingSenderId: "443978047513"
}
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()