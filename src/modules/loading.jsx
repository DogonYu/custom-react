import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';
const SET_ERROR_CODE = 'loading/SET_ERROR_CODE';

export const startLoading = createAction(START_LOADING, requestType => requestType);
export const finishLoading = createAction(FINISH_LOADING, requestType => requestType);
export const setErrorCode = createAction(SET_ERROR_CODE, code => code);

const initialState = {
  eCode: null,
};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
      eCode: null,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
    [SET_ERROR_CODE]: (state, { payload: code }) => ({
      ...state,
      eCode: code,
    }),
  },
  initialState
);

export default loading;
