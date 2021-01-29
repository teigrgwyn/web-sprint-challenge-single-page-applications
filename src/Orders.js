import React from 'react';

export default function Orders(props) {
  const { orders } = props;

  

  return (
    <>
      <h1>Orders on the Way:</h1>
      <div style={{ border: '1px solid yellow' }}>
        {
          orders.map(order => (
            <div key='temp' className='order' style={{ border: '1px solid crimson' }}>
              <h3>{order.name}</h3>
              <h5>Size: {order.size}</h5>
              <h5>Toppings: {order.topping1}, {order.topping2}, {order.topping3}, {order.topping4}, </h5>
              <h6>Special Instructions: {order.instructions}</h6>
            </div>
          ))
        }
      </div>
    </>
  )
}