import { initializeApp } from "./../node_modules/firebase/app";
import { getDatabase, ref, onValue } from "./../node_modules/firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyAh7L5cAcRC_dgCeIQuPcd0Q6jtevLFVsM",
    authDomain: "assignment-97cac.firebaseapp.com",
    databaseURL: "https://assignment-97cac-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "assignment-97cac",
    storageBucket: "assignment-97cac.appspot.com",
    messagingSenderId: "875974693695",
    appId: "1:875974693695:web:591443a6e695bbc62a798a",
    measurementId: "G-P21WTVKNEJ"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const data = ref(db);
export default onValue;
export { data };
