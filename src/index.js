import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import Theme from '../style/themes/Theme.js';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { create } from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(thunk))(createStore);

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const generateClassName = createGenerateClassName();

ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <MuiThemeProvider theme={createMuiTheme(Theme)}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </JssProvider>
  , document.querySelector('.container'));
