import React from 'react';

const List = (props) => {
  const groceries = props.groceries ? props.groceries.map((grocery) => {
    return <p key={grocery.id}>{grocery.item}</p>;
  }) : null;

  return (
    <div>
      {groceries}
    </div>
  );
};

export default List;
