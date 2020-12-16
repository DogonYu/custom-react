import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import modules, { rootSaga } from './modules';

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(modules, composeWithDevTools(applyMiddleware(logger, sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default store;
