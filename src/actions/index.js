// Coloque aqui suas actions
export const dispatchEmailAction = (state) => (
  { type: 'user/addUserEmail', payload: state });

export const getApiResultAction = (json) => (
  { type: 'api/RequestSuccess', payload: Object.keys(json) });

export const getApiErrorAction = (error) => (
  { type: 'api/RequestFailure', payload: error });
