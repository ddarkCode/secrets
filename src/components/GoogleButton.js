import React from 'react';
import '../css/GoogleButton.css';

function GoogleButton() {
  return (
    <button
      id="google-button"
      onClick={() => (window.location.href = '/api/auth/google')}
      role="button"
    >
      <div>
        {' '}
        <img src="/google-img.png" />
      </div>
      <span>Sign In With Google</span>
    </button>
  );
}

export default GoogleButton;
