const defaultState = {
  docked: false,
  submitted: false,
  overlapSubmitted: false,
  showMenu: false,
  major1: '',
  major2: ''
}

export default (state=defaultState, action) => {
  switch(action.type){
    case "DOCK_TRIGGERED": {
      state = {...state, docked: !state.docked}
      break;
    }
    case "BUTTON_PRESS": {
      state = {...state, submitted: true, overlapSubmitted: false}
      break;
    }
    case "MAJOR1_CHANGE": {
      state = {...state, major1: action.major, submitted: false}
      break;
    }
    case "MAJOR2_CHANGE": {
      state = {...state, major2: action.major, submitted: false}
      break;
    }
    case "OVERLAP_PRESS": {
      state = {...state, overlapSubmitted: true}
      break;
    }
    case '@@router/LOCATION_CHANGE': {
      const pathname = action.payload.pathname;
      if (!pathname.includes('/home')) {
        state = {
          ...state,
          showMenu: false,
          docked: false,
        };
      } else {
        state = {
          ...state,
          showMenu: true,
          docked: true,
        };
      }
      break;
    }
  }
  return state;
};
