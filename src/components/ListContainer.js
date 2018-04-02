import React from 'react';

import List from './List';
import FirebaseService from '../services/FirebaseService';

export default class ListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groceries: null
    }

    this.addGrocery = this.addGrocery.bind(this);
  }

  componentWillMount() {
    this.getGroceries();
  }

  formatGrocery(groceryRef) {
    return {
      key: groceryRef.key,
      item: groceryRef.child('item').val(),
      quantity: groceryRef.child('quantity').val(),
      unit: groceryRef.child('unit').val()
    };
  }

  getGroceries() {
    FirebaseService.getGroceries()
      .then((groceries) => {
        let groceryList = [];
        groceries.forEach((grocery) => {
          groceryList.push(this.formatGrocery(grocery));
        });
        this.setState({ groceries: groceryList });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addGrocery(key) {
    console.log('adding 1 to ', key);
    FirebaseService.addToGrocery(key);
    this.getGroceries();
  }

  render() {
    return (
      <List
        groceries={this.state.groceries}
        addGrocery={this.addGrocery}
      />
    );
  }
}
