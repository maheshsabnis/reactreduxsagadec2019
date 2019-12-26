import React from 'react';
import ReactDom from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import "!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css";
import MainComponent from './reduxapp/maincomponent';
 
// import createStore from redux
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger'
// import reducer
// this will by default read the combineRedecurs() export
import reducer from './reduxapp/reducers/orderreduecrs';
// import Provider from react-redux so that the react-redux object model will 
// be coupled 
import { Provider } from 'react-redux';
// import saga
import  rootSagaOrders  from './reduxapp/sagas/ordersaga';
import {getOrders} from './reduxapp/actions/orderactions';
import SearchComponent from './reduxapp/components/officeuicomponents/mysearchcomponent';

// saga middleware that will monitor all external async operations
// this will also monitor the store

const sagaMiddleware = createSagaMiddleware();

// create a store using createStore() and reducer as input parameter
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger),
); 

// initialize saga so that it will run the watchers
console.log(JSON.stringify(store));
sagaMiddleware.run(rootSagaOrders);

// displatch action from store
// passing blank expression
store.dispatch(getOrders());

 
// copule the Provider with store and execute MainReduxComponent
ReactDom.render(
    <Provider store={store}>
      <SearchComponent/>
    </Provider>,
    document.getElementById('app')
);