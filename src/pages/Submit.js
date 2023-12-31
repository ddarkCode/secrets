import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { postSecret } from '../redux/secrets/secretsSlice';
import authenticate from '../components/authenticate';

import '../css/Submit.css';

function Submit() {
  const [secret, setSecret] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setSecret(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(postSecret({ secret }));

    setSecret('');
    history.push('/pages/secrets');
  }
  return (
    <div className="submit-container">
      <div className="submit-landing-page">
        <div>
          <img src="/secretslogo.png" />
        </div>

        <p>Don't keep your secrets, share them anonymously!</p>
      </div>

      <form onSubmit={handleSubmit} className="submit-secret">
        <div className="form-group">
          <input
            type="text"
            className="form-control text-center"
            name="secret"
            placeholder="What's your secret?"
            value={secret}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default {
  component: authenticate(Submit),
};
