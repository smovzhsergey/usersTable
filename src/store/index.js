// Core
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

// Instruments
import reducers from 'reducers';
import { saga } from 'sagas';

const dev = process.env.NODE_ENV === 'development'; // eslint-disable-line
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools && dev ? devtools : compose;

const middleware = [];

const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

export default createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

sagaMiddleware.run(saga);
