import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
// connect component to redux with connect
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const Register = ({ setAlert }) => {
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

  // using async await for submit
  const onSubmit = async e => {
    e.preventDefault();
    // make sure pw's match
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      console.log("USER REGISTERED SUCCESS");
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
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
};

// connect takes in either of two things:
// 1) any state you want to map
// 2) object with actions you want to use
export default connect(null, { setAlert })(Register);
