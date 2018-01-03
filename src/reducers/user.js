
const initialState = {
  name: '',
  netID: '',
  password: '',
  takenClasses: [],
  success: false,
  isLoading: false,
  error: false,
  errorMessage: null,
  isLoggedIn: false,
};

export default (state=initialState, action)=> {
  switch(action.type){
    case 'BEGIN_LOGIN': {
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: null,
      };
    }
    case 'FAILED_LOGIN': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.message,
        success: false,
      }
    }
    case 'END_LOGIN': {
      const { data } = action.payload;
      return {
        ...initialState,
        netID: data.netID,
        name: data.name,
        takenClasses: (data.classes ? data.classes : []),
        success: true,
        isLoggedIn: true,
      }
    }
    case 'BEGIN_GET_MY_CLASSES': {
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: null,
      };
    }
    case 'FAILED_GET_MY_CLASSES': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.message,
        success: false,
      }
    }
    case 'END_GET_MY_CLASSES': {
      const { data } = action.payload.data;
      return {
        ...state,
        takenClasses: data,
        success: true,
      }
    }
    case 'BEGIN_PUT_MY_CLASSES': {
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: null,
      };
    }
    case 'FAILED_PUT_MY_CLASSES': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.message,
      }
    }
    case 'END_PUT_MY_CLASSES': {
      return {
        ...state,
        isLoading: false,
      }
    }
    case 'CHANGE_USERDATA': {
      return {
        ...state,
        takenClasses: action.payload,
      }
    }
    case 'SIGNUP_COMPLETE': {
      return {
        ...state,
        name: action.payload.name,
        netID: action.payload.netID,
        password: action.payload.password,
      }
    }
    case 'BEGIN_LOGOUT': {
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: null,
      }
    }
    case 'FAILED_LOGOUT': {
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.message,
        success: false,
      }
    }
    case 'END_LOGOUT': {
      const { data } = action.payload;
      return {
        ...initialState,
        success: true,
      }
    }
  }
  return state;
}
