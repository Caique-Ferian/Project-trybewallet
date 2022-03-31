// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { getApiResultAction, getApiErrorAction } from '../actions';

const initialState = {
  currencies: [],
  error: '',
};

export function fetchCurrencyExchange() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      return dispatch(getApiResultAction(data));
    } catch (error) {
      return dispatch(getApiErrorAction(error));
    }
  };
}

export default function walletReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case 'api/RequestSuccess':
    return {
      ...state, currencies: payload.filter((currency) => currency !== 'USDT'),
    };
  case 'api/RequestFailure':
    return {
      ...state, error: payload,
    };
  default:
    return state;
  }
}
