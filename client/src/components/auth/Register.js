import React, { Fragment, useState } from "react";

const Register = () => {
  // object with field values

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  //   make copy of formdata using spread(...), then name 'attribute' in each element to e.target.value
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // make sure pw's match
    if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      console.log("this is form data", formData);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={event => onChange(event)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={event => onChange(event)}
            name='email'
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={event => onChange(event)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <a href='login.html'>Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;
