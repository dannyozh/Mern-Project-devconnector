import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  // object with field values

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  //   make copy of formdata using spread(...), then name 'attribute' in each element to e.target.value
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // using async await for submit
  const onSubmit = async e => {
    e.preventDefault();
    // make sure pw's match
    console.log("LOGIN SUCCESS");
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={event => onChange(event)}
            name='email'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={event => onChange(event)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
