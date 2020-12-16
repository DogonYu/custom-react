import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';

export function* rootSaga() {
  yield all([]);
}

export default combineReducers({
  loading,
});
