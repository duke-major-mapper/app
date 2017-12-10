import crud from './helpers/crud';

const login = (netID, password) => (
  crud({
    dispatch: {
      begin: 'BEGIN_LOGIN',
      fail: 'FAILED_LOGIN',
      end: 'END_LOGIN',
    },
    method: 'GET',
    url: '/login?id=' + netID + '&pw=' + password,
  })
);

const changeTakenClasses = (takenClasses) => {
  return {
    type: 'CHANGE_USERDATA',
    payload: takenClasses,
  }
}

const signUpComplete = (userInfo) => {
  return {
    type: 'SIGNUP_COMPLETE',
    payload: userInfo,
  }
}

export {
  login,
  changeTakenClasses,
  signUpComplete
};
