import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];
const initialState = {};
let store;

const initStore = () => {
  const windowGlobal = typeof window !== 'undefined' && window;
  const devtools =
    process.env.NODE_ENV === 'development' &&
    window &&
    windowGlobal.devToolsExtension
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f;
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(...middleware),
      devtools,
    ),
  );
};

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./reducers/', () => {
      const newRootReducer = require('./reducers/').default;
      store.replaceReducer(newRootReducer);
    });
  }
}
// const createStore = () => reduxCreateStore(rootReducer);
export default ({ element, props }) => (
  <Provider {...props} store={initStore()}>
    {element}
  </Provider>
);

// import React from 'react';
// import { Router } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { applyMiddleware, compose, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './src/reducers';
//
// const loadDevTools = () =>
//   process.env.NODE_ENV === 'development' && window.devToolsExtension
//     ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__()
//     : f => f;
//
// const store = createStore(
//   rootReducer,
//   compose(applyMiddleware(thunk), loadDevTools())
// );
//
// exports.replaceRouterComponent = ({ history }) => {
//   const ConnectedRouterWrapper = ({ children }) => (
//     <Provider store={store}>
//       <Router history={history}>{children}</Router>
//     </Provider>
//   );
//
//   return ConnectedRouterWrapper;
// };

// import React from 'react';
// import { Provider } from 'react-redux';
// import { createStore as reduxCreateStore } from 'redux';
// import rootReducer from './reducers';
//
// const createStore = () => reduxCreateStore(rootReducer);
// export default ({ element }) => (
//   <Provider store={createStore()}>{element}</Provider>
// );
