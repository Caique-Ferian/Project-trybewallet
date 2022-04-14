// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from '../reducers/index';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';
import wallet from '../reducers/wallet';

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const store = configureStore({
  reducer: {
    user,
    wallet,
  },
});
export default store;
