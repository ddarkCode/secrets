import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../components/Input';
import Form from '../components/Form';
import GoogleButton from '../components/GoogleButton';
import { signup } from '../redux/auth/authReducer';

import '../css/auth.css';

function Signup() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const u = useSelector((state) => state.auth.user);

  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prevState) => ({ ...prevState, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signup(user));
    history.push('/pages/secrets');
  }
  return (
    <>
      {u ? (
        <Redirect to={'/pages/secrets'} />
      ) : (
        <div className="auth">
          <h1>Signup</h1>
          <Link to="/pages/signin">Already Have An Account? Signin</Link>
          <Form onSubmit={handleSubmit}>
            <Input
              text={'email'}
              type={'email'}
              value={user.email}
              onChange={handleChange}
            />
            <Input
              text={'password'}
              type={'password'}
              value={user.password}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-dark">
              Signup
            </button>
          </Form>

          <div className="or">
            <hr />
            <span>Or</span>
            <hr />
          </div>
          <GoogleButton />
        </div>
      )}
    </>
  );
}

export default Signup;
