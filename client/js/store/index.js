import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const store = createStore(
	rootReducer,
	applyMiddleware(
		thunkMiddleware,
		promiseMiddleware(),
		createLogger()
	)
);

export default store;