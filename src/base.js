import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAU_lpkMBwBB3E89sIyFXf3--tNPZ0jfbc",
  authDomain: "fish-store-6a4ca.firebaseapp.com",
  databaseURL: "https://fish-store-6a4ca.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
