const initialState = {
  name: '',
  netID: '',
  password: '',
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_NAME': {
      return {
        ...state,
        name: action.payload,
      };
    }
    case 'CHANGE_NETID': {
      return {
        ...state,
        netID: action.payload,
      }
    }
    case 'CHANGE_PASSWORD': {
      return {
        ...state,
        password: action.payload,
      }
    }
    case 'CHANGE_ERROR': {
      return {
        ...state,
        errorMessage: action.payload,
      }
    }
  }
  return state;
}
