import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Home.css';

function LinkButton({ id, link, text }) {
  return (
    <Link id={id} to={link}>
      {text}
    </Link>
  );
}

export default LinkButton;
