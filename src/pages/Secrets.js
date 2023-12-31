import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LinkButton from '../components/LinkButton';
import { signout } from '../redux/auth/authReducer';
import authenticate from '../components/authenticate';
import { getAllSecrets } from '../redux/secrets/secretsSlice';
import Secret from '../components/Secret';

import '../css/Secrets.css';

function Secrets() {
  const [disButton, setDisButton] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSecrets());
  }, []);

  function handleSignout() {
    setDisButton(true);
    dispatch(signout());
    console.log('Signing out');
    history.push('/pages/signin');
  }

  const secrets = useSelector((state) => state.secrets.secrets);

  return (
    <div className="secrets-main-page">
      <div className="secrets-image-container">
        <div>
          <img src="/secretslogo.png" />
        </div>
        <p>You've Discovered All Secrets!</p>
      </div>

      <hr />

      <div className="links">
        <button
          disabled={disButton}
          className="signout light"
          onClick={handleSignout}
        >
          Signout
        </button>

        <LinkButton id="dark" link="/pages/submit" text={'Submit a Secret'} />
      </div>

      <hr />

      <section className="list-of-secrets">
        {secrets.map((secret) => {
          return <Secret key={secret._id} {...secret} />;
        })}
      </section>
    </div>
  );
}

export default {
  component: authenticate(Secrets),
  loadData: (store) => store.dispatch(getAllSecrets()),
};
