import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyBrO2P7Z6TOYxCIjB1lULjrLpcBuadBdKE",
    authDomain: "learnreactjs-1f7e7.firebaseapp.com",
    databaseURL: "https://learnreactjs-1f7e7.firebaseio.com",

});

const base = Rebase.createClass(firebaseApp.database());
export {firebaseApp}
export default base;