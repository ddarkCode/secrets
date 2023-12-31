import React from 'react';
import { capitalize } from 'lodash';

import '../css/Input.css';

function Input({ type, text, onChange, value }) {
  return (
    <div className="input-container">
      <label htmlFor={text}>{capitalize(text)}</label>
      <input
        id={text}
        type={type}
        name={text}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default Input;
