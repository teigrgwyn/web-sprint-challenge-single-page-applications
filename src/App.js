import React, { useState } from "react";
import Form from "./Form"
import Orders from "./Orders"
import { BrowserRouter, Route, Link } from 'react-router-dom';


const App = () => {
  const [orders] = useState([]); // in the future, only the file declaring the state should be able to change it...

  return (
    <>
      <h1>Lambda Eats</h1> 
      <BrowserRouter>
        <Route exact path='/'>
          <Link to='/pizza/'>
            <h3>I'd Like to Make an Order</h3>
          </Link>
          <Orders orders={orders} />
        </Route>
        <Route path = '/pizza/'>
          <Link to='/'>
            <h3>Return to Home</h3>
          </Link>
          <Form orders={orders} />
        </Route>
      </BrowserRouter>
    </>
  );
};
export default App;
