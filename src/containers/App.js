// Packages
import React, { Component } from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import thunkMiddleware from 'redux-thunk';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Redirect } from 'react-router';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Components and Containers
import Header from './../components/Header';
import Home from './Home';
import ConnectedSwitch from './../components/utils/switch';
import SignUp from './../components/SignUp';
import { Login } from './../components';

// redux-persist
import { PersistGate } from 'redux-persist/es/integration/react';
import { configureStore, DevTools, history } from './utils/store';

import * as allReducers from "./../reducers";

// Styling
import logo from './../images/react_logo.svg';
import theme from '../global/material-ui-theme';
import './../styles/index.css';

injectTapEventPlugin();

const { store, persistor } = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} >
          <div>
            <div>
              <ConnectedRouter history={history}>
                <MuiThemeProvider muiTheme={theme}>
                  <div>
                    <Header history={history}/>
                    <ConnectedSwitch>
                      <Route path='/login' exact component={Login} />
                      <Route path='/home' exact component={Home} />
                      <Route path='/' exact component={Login} />
                    </ConnectedSwitch>
                  </div>
                </MuiThemeProvider>
              </ConnectedRouter>
            </div>
            <DevTools />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
