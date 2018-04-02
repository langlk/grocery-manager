import React from 'react';

const List = (props) => {
  const groceries = props.groceries ? props.groceries.map((grocery) => {
    return (
      <div key={grocery.key}>
        <h3>{grocery.name}</h3>
        <h5>{grocery.quantity} {grocery.unit}</h5>
        <button onClick={() => props.addGrocery(grocery.key)}>Add More</button>
      </div>
    );
  }) : null;

  return (
    <div>
      {groceries}
    </div>
  );
};

export default List;
