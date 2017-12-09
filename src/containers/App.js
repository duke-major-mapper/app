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


import * as allReducers from "./../reducers";

// Styling
import logo from './../images/react_logo.svg';
import theme from '../global/material-ui-theme';
import './../styles/index.css';

const reducers = combineReducers({
  ...allReducers,
  router: routerReducer,
});

const history = createHistory();
const middleware = routerMiddleware(history);

injectTapEventPlugin();

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-b"
    changePositionKey="ctrl-q"
    defaultIsVisible={false}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>,
);

const enhancer = compose(
  applyMiddleware(middleware, thunkMiddleware),
  DevTools.instrument(),
);

const store = createStore(reducers, enhancer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <div>
            <ConnectedRouter history={history}>
              <MuiThemeProvider muiTheme={theme}>
                <Header />
                <ConnectedSwitch>
                  <Route path='/login' exact component={Login} />
                  <Route path='/home' exact component={Home} />
                  <Redirect from='*' to='/login' />
                </ConnectedSwitch>
              </MuiThemeProvider>
            </ConnectedRouter>
          </div>
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default App;
