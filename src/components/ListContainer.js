import React from 'react';

import List from './List';
import GroceryForm from './GroceryForm';
import FirebaseService from '../services/FirebaseService';

export default class ListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries: null,
      staples: null
    }
    this.addGrocery = this.addGrocery.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  componentWillMount() {
    this.getGroceries();
    this.getStaples();
  }

  formatGrocery(groceryRef) {
    return {
      key: groceryRef.key,
      name: groceryRef.child('name').val(),
      quantity: groceryRef.child('quantity').val(),
      unit: groceryRef.child('unit').val()
    };
  }

  formatStaple(stapleRef) {
    return {
      key: stapleRef.key,
      name: stapleRef.child('name').val(),
      unit: stapleRef.child('unit').val()
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

  getStaples() {
    FirebaseService.getStaples()
      .then((staples) => {
        let stapleList = [];
        staples.forEach((staple) => {
          stapleList.push(this.formatStaple(staple));
        });
        this.setState({ staples: stapleList });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addGrocery(key) {
    FirebaseService.addToGrocery(key);
    this.getGroceries();
  }

  addToList(grocery) {
    FirebaseService.addGrocery(grocery);
    this.getGroceries();
  }

  render() {
    return (
      <div>
        <List
          groceries={this.state.groceries}
          addGrocery={this.addGrocery}
        />
        <GroceryForm
          staples={this.state.staples}
          addToList={this.addToList}
        />
      </div>

    );
  }
}
