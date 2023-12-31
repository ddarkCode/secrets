import React from 'react';

import LinkButton from '../components/LinkButton';

import '../css/Home.css';

function Home() {
  return (
    <div className="homepage-container">
      <div className="lc">
        <div className="logo-container">
          <img src="/logo.png" alt="logo" />
        </div>
      </div>
      <hr />
      <div className="home-page-link">
        <LinkButton id="light" link={'/pages/signup'} text={' Signup'} />
        <LinkButton id="dark" link={'/pages/signin'} text={'Signin'} />
      </div>
    </div>
  );
}

export default Home;
