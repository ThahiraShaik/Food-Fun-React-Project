import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Store';   // ✅ Make sure path is correct
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

