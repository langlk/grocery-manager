import React from 'react';

import List from './List';
import FirebaseService from '../services/FirebaseService';

export default class ListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groceries: null
    }
  }

  componentWillMount() {
    FirebaseService.getGroceries()
      .then((groceries) => {
        let groceryList = [];
        groceries.forEach((grocery) => {
          groceryList.push({ id: grocery.key, item: grocery.val() });
        });
        this.setState({ groceries: groceryList });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <List groceries={this.state.groceries} />
    );
  }
}
