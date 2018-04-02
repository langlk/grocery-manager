import firebase from 'firebase';

import firebaseConfig from '../FirebaseConfig';

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default class FirebaseService {
  static getGroceries() {
    return database.ref('/groceries/').once('value');
  }
}
