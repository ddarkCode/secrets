import React from 'react';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

import Routes from '../src/Routes';

export default function renderer(req, store, context) {
  const stringContent = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        {renderRoutes(Routes)}
      </StaticRouter>
    </Provider>
  );

  return `
 <!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>Secrets</title>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
      integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
      integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
      crossorigin="anonymous"
    />
    <link rel="stylesheet" href="/css/styles.css" />
  </head>

  <body>
    <div id="root">${stringContent}</div>


     <script>
       window.INITIAL_STATE = ${serialize(store.getState())}
    </script>
    <script src="/bundle.js"></script>
  </body>
</html>

  
  `;
}
