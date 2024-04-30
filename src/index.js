import React from 'react';
import ReactDOM from 'react-dom/client';
// router
import { RouterProvider } from 'react-router-dom';
// redux
import { Provider } from 'react-redux';
import store from './store'

import router from './router'
import './theme.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
