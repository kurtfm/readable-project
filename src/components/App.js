import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import PostsView from './PostsView'
import PostView from './PostView'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './../reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
)

const store = createStore(
  reducer,
  enhancer
)

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={PostsView}/>
            <Route exact path='/category/:category' component={PostsView}/>
            <Route exact path='/category/:category/:id' component={PostView}/>
            <Route path='/post/:id' component={PostView}/>
            <Route path='*' exact={true} render={() => (
              <div>
                <div className="missing-view">
                  Sorry! The page you are looking for can't be found.
                  Here are your book shelves instead:
                </div>
                <PostsView />
              </div>
            )}/>
        </Switch>
        </div>
      </Provider>
    )
  }

}

export default App
