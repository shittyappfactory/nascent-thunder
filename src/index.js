import constants, { ACTIONS } from './constants'
import './index.scss';

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import createLogger from 'redux-logger';
import reducers from './reducers'

import World from './world';
import Login from './Login';

const reducer = combineReducers(Object.assign({}, { reducers }, {
  routing: routeReducer
}))

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, createLogger())(createStore)

const store = createStoreWithMiddleware(reducer)

const App = props => <div><h2 className="app-title">App</h2>{ props.children }</div>;
const Foo = props => <div>Foo</div>;
const Bar = props => <div>Bar</div>;
const LoginComponent = props => Login({ props });

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Login}/>
      <Route path="foo" component={Foo}/>
      <Route path="bar" component={Bar}/>
      <Route path="world" component={connect(state => (state))(World)} />
    </Router>
  </Provider>,
  document.getElementById('content'),
  () => {
    store.dispatch({
      type: ACTIONS.APP_INIT,
      dispatch: store.dispatch,
    });
    store.dispatch({
      type:ACTIONS.INIT_SELF,
      username: 'junk'
    });
  }
)
