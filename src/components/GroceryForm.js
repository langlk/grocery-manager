import React from 'react';

export default class GroceryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaple: null,
      quantity: 0
    };
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.addToList = this.addToList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectedStaple: nextProps.staples ? nextProps.staples[0] : null });
  }

  handleKeyChange(event) {
    this.setState({
      selectedStaple: this.props.staples[parseInt(event.target.value)],
      quantity: 0
    });
  }

  handleQuantityChange(event) {
    this.setState({ quantity: event.target.value });
  }

  addToList() {
    let grocery = this.state.selectedStaple;
    grocery.quantity = this.state.quantity;
    this.props.addToList(grocery);
  }

  render() {
    const staples = this.props.staples ? this.props.staples.map((staple) => {
      return <option value={staple.key} key={staple.key}>{staple.name}</option>;
    }) : null;

    return (
      <div>
        <h2>Add a Grocery</h2>
        <select
          onChange={this.handleKeyChange}
        >
          {staples}
        </select>
        <input
          type='number'
          onChange={this.handleQuantityChange}
        />
        {this.state.selectedStaple ? this.state.selectedStaple.unit : null }
        <button onClick={this.addToList}>Add</button>
      </div>
    );
  }
}
