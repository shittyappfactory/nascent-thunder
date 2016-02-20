import constants from './constants'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import reducers from './reducers'

import World from './world';
import User from './User';

import './index.scss';

const reducer = combineReducers(Object.assign({}, { reducers }, {
  routing: routeReducer
}))

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory)
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)

const store = createStoreWithMiddleware(reducer)

const testUser = new User('obogobo');
debugger;

const App = props => <div><h2 className="app-title">App</h2>{ props.children }</div>;
const Foo = props => <div>Foo</div>;
const Bar = props => <div>Bar</div>;

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
        <Route path="world" component={World} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('content')
)
