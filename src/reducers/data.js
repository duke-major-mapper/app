const initialState = {
  isLoading: false,
  majors: [],
  classes: {},
  requirements: {},
  overlap: [],
  error: false,
  errorMessage: null,
  AllClasses: [],
};

function data(state = initialState, action) {
  switch (action.type) {
    case 'BEGIN_GET_MAJORS': {
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: null,
      };
    }
    case 'FAILED_GET_MAJORS': {
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
      }
    }
    case 'END_GET_MAJORS': {
      return {
        ...state,
        majors: action.payload.data.data,
        isLoading: false,
        error: false,
      }
    }
    case 'BEGIN_GET_ALL_CLASSES': {
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: null,
      };
    }
    case 'FAILED_GET_ALL_CLASSES': {
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
      }
    }
    case 'END_GET_ALL_CLASSES': {
      const { data } = action.payload.data;
      return {
        ...state,
        AllClasses: data,
        isLoading: false,
        error: false,
      }
    }
    case 'BEGIN_GET_CLASSES': {
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: null,
      };
    }
    case 'FAILED_GET_CLASSES': {
        return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload.message,
      }
    }
    case 'END_GET_CLASSES': {
      let temp_classes = state.classes;
      const data = action.payload.data;
      temp_classes[data.id] = data.data;
      return {
        ...state,
        classes: temp_classes,
        isLoading: false,
        error: false,
      }
    }
    case 'BEGIN_GET_OVERLAP': {
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: null,
      };
    }
    case 'FAILED_GET_OVERLAP': {
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
      }
    }
    case 'END_GET_OVERLAP': {
      return {
        ...state,
        overlap: action.payload.data.data,
        isLoading: false,
        error: false,
      }
    }
    case 'BEGIN_GET_REQS': {
      return {
        ...state,
        isLoading: true,
        error: false,
        errorMessage: null,
      };
    }
    case 'FAILED_GET_REQS': {
      return {
        ...state,
        error: true,
        errorMessage: action.payload.message,
      }
    }
    case 'END_GET_REQS': {
      let temp_reqs = state.requirements;
      const data = action.payload.data.data;
      temp_reqs[data[0].major_id] = data;
      return {
        ...state,
        requirements: temp_reqs,
        isLoading: false,
        error: false,
      }
    }
    case 'BEGIN_LOGIN': {
      return initialState;
    }
    case 'END_LOGOUT': {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export default data;
