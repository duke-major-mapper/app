import { push } from 'react-router-redux';

const initialState = {
  name: '',
  netID: '',
  password: '',
  takenClasses: [],
  success: false,
  isLoading: false,
  error: false,
  errorMessage: null,
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
      const result = data.data[0];
      return {
        ...initialState,
        name: result.name,
        netID: result.id,
        password: result.password,
        success: true,
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
  }
  return state;
}
