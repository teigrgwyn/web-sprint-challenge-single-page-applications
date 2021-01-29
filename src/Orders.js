import React from 'react';

export default function Orders(props) {
  const { orders } = props;

  return (
    <>
      <h1>Orders on the Way:</h1>
      {
        orders.map(order => (
          <div key='temp' className='order' style={{ border: '1px solid crimson' }}>
            <h1>{order.name}</h1>
            <h3>Size: {order.size}</h3>
            <h3>Toppings: {order.topping1}, {order.topping2}, {order.topping3}, {order.topping4}, </h3>
            <h3>Special Instructions: {order.instructions}</h3>
          </div>
        ))
      }
    </>
  )
}