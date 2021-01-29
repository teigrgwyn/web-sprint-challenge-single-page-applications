import React, { useState, useEffect } from 'react';
import * as yup from 'yup'; // import absolutely everything yup has to offer
import axios from 'axios';
import Styled from 'styled-components';

const FormWrapper = Styled.form`
  display: flex;
  flex-direction: column;
`;

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Your name entry must be at least 2 characters long."),
  topping1: yup
    .boolean()
    .oneOf([true], "We don't allow panzies to eat here. You must get cheese."),
  topping2: yup
    .boolean()
    .oneOf([true, false], "test"),
  topping3: yup
    .boolean()
    .oneOf([true, false], "test"),
  topping4: yup
    .boolean()
    .oneOf([true, false], "test"),
  instructions: yup
    .string()
});

const initialForm = {
  name: '', //text
  size: '', //dropdown
  topping1: true, //checkboxes
  topping2: false,
  topping3: false,
  topping4: false,
  instructions: '' //text
}

export default function Form(props) {
  const { orders } = props;

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({ name: '', topping1: '', topping2: '', topping3: '', topping4: '', instructions: '' })
  const [disabled, setDisabled] = useState(true);

  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
  }

  const onFormChange = event => {
    const { name, type, value, checked } = event.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    setFormErrors(name, valueToUse);
    setForm({ ...form, [name]: valueToUse });
  }

  const submit = event => {
    event.preventDefault();
    axios.post('https://reqres.in/api/users', form) // default api for returning 'fake' POSTs
      .then(res => {
        orders.push(form);
        setForm(initialForm);
      })
      .catch(err => {
        console.log('Axios POST Catch "console.log" Executed');
      })
  }

  useEffect(() => {
    schema.isValid(form).then(valid => setDisabled(!valid));
  }, [form]) // run effect when form is changed - make submit button valid only if form follows schema structure

  return (
    <div>
      <h1>Submit a Pizza Order:</h1>
      <FormWrapper className='form-component' onSubmit={submit}>
        <input
          name='name'
          value={form.name}
          onChange={onFormChange}
          placeholder='Name for Order?'
          style={{ width: '200px' }}
        />
        <br></br>
        <label>
          Size:
          <select name='size'>
            <option>Medium</option>
            <option>Small</option>
            <option>Large</option>
            <option>X-Large</option>
            value={form.size}
            onChange={onFormChange}
          </select>
        </label>
        <br></br>
        <label>
          Cheese?
          <input type='checkbox'
            name='topping1'
            checked={form.topping1}
            onChange={onFormChange}
          />
        </label>
        <label>
          Pepperoni?
          <input type='checkbox'
            name='topping2'
            checked={form.topping2}
            onChange={onFormChange}
          />
        </label>
        <label>
          Olive?
          <input type='checkbox'
            name='topping3'
            checked={form.topping3}
            onChange={onFormChange}
          />
        </label>
        <label>
          Mushroom?
          <input type='checkbox'
            name='topping4'
            checked={form.topping4}
            onChange={onFormChange}
          />
        </label>
        <br></br>
        Special Instructions?
        <input
          name='instructions'
          value={form.instructions}
          onChange={onFormChange}
          style={{ width: '600px', height: '200px' }}
        />
        <input type='submit'
          disabled={disabled}
          style={{ width: '100px' }}
        />
        <br></br>
        {/* error-div below spits out warning, not sure why... but doesn't detract from functionality! */}
        <div className='error-div' style={{ color: 'red' }}>
          <div>{errors.name}</div>
        </div>
      </FormWrapper>
    </div>
  )
}