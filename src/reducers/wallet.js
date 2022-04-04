// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { getApiKeysAction, getApiErrorAction, getApiResultAction } from '../actions';

const initialState = {
  currencies: [],
  error: '',
  apiResult: {},
  expenses: [],
};

export function fetchCurrencyExchange(type) {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      if (type === 'key') {
        return dispatch(getApiKeysAction(data));
      }
      return dispatch(getApiResultAction(data));
    } catch (error) {
      return dispatch(getApiErrorAction(error));
    }
  };
}

export default function walletReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case 'api/RequestKeysSuccess':
    return {
      ...state, currencies: payload.filter((currency) => currency !== 'USDT'),
    };
  case 'api/RequestAllSuccess':
    return {
      ...state, apiResult: payload,
    };
  case 'api/RequestFailure':
    return {
      ...state, error: payload,
    };
  case 'spend/addSpend':

    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case 'spend/removeSpend':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== payload),
    };
  default:
    return state;
  }
}
