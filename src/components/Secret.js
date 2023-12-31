import React from 'react';

import { formatDate } from '../utils';

function Secret({ _id, username, createdAt, secret }) {
  return (
    <div className="single-secret">
      <div className="secret-meta">
        <span>{username}</span>
        <span>{formatDate(createdAt)}</span>
      </div>
      <p>{secret}</p>
    </div>
  );
}

export default Secret;
