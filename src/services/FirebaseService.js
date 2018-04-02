import firebase from 'firebase';

import firebaseConfig from '../FirebaseConfig';

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default class FirebaseService {
  static getGroceries() {
    return database.ref('/groceries/').once('value');
  }

  static getStaples() {
    return database.ref('/staples/').once('value');
  }

  static addToGrocery(key) {
    let groceryRef = database.ref('/groceries/' + key);
    groceryRef.transaction((grocery) => {
      if (grocery) {
        if (grocery.quantity != null) {
          grocery.quantity++;
        }
      }
      return grocery;
    });
  }

  static addGrocery(groceryItem) {
    let groceryRef = database.ref('/groceries/' + groceryItem.key);
    groceryRef.transaction((grocery) => {
      if (grocery) {
        grocery.quantity += groceryItem.quantity;
        return grocery;
      } else {
        return groceryItem;
      }
    });
  }
}
