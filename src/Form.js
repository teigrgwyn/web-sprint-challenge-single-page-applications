import React, { useState, useEffect } from 'react';
import * as yup from 'yup'; // import absolutely everything yup has to offer
import axios from 'axios';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Your name entry must be at least 2 characters long."),
});

const initialForm = {
  name: '', //text
  size: '', //dropdown
  topping1: false, //checkboxes
  topping2: false,
  topping3: false,
  topping4: false,
  instructions: '' //text
}

export default function Form(props) {
  const { orders } = props;

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({ name: '' })
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
        console.log('Axios POST Catch');
      })
  }

  useEffect(() => {
    schema.isValid(form).then(valid => setDisabled(!valid));
  }, [form]) // run effect when formData is changed - make submit button valid only if formData follows formSchema structure

  return (
    <h1>Submit a Pizza Order:</h1>
  )
}