import firebase from "firebase/app";
import "firebase/database"

var firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	databaseURL: process.env.REACT_APP_DATABASE_URL
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
export default firebase.database();
