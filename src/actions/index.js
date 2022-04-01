// Coloque aqui suas actions
export const dispatchEmailAction = (state) => (
  { type: 'user/addUserEmail', payload: state });

export const getApiKeysAction = (json) => (
  { type: 'api/RequestKeysSuccess', payload: Object.keys(json) });

export const getApiErrorAction = (error) => (
  { type: 'api/RequestFailure', payload: error });

export const getApiResultAction = (json) => (
  { type: 'api/RequestAllSuccess', payload: json });

export const addSpendAction = (spend) => ({ type: 'spend/addSpend', payload: spend });

export const totalValueAction = (value) => (
  { type: 'totalValue/changeTotal', payload: value });
