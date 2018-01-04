const initialState = {
  name: '',
  netID: '',
  password: '',
  errorMessage: '',
  signup: false,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case 'SIGN_UP_TRIGGER': {
      return {
        ...state,
        signup: !state.signup,
      }
    }
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
    case 'BEGIN_LOGIN': {
      return initialState;
    }
    case 'END_LOGOUT': {
      return initialState;
    }
  }
  return state;
}
