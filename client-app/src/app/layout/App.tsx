import React from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import bookReducer from '../stores/reducers/bookReducer';
import userReducer from '../stores/reducers/userReducer';
import Routes from './Routes';

const rootReducer = combineReducers({
  bookReducer,
  userReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

// export const history  = createBrowserHistory();

const App =  ()=> {

  return (
    <Provider store={store}>
      <BrowserRouter>
      {/* <Router history={history}> */}
        <Routes />
      {/* </Router> */}
      </BrowserRouter>
    </Provider>

  );
}

export default App;
