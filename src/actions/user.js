import crud from './helpers/crud';

const login = (netID, password) => (
  crud({
    dispatch: {
      begin: 'BEGIN_LOGIN',
      fail: 'FAILED_LOGIN',
      end: 'END_LOGIN',
    },
    method: 'PUT',
    url: '/login',
    data: {
      netID: netID,
      password: password
    }
  })
);

const changeTakenClasses = (takenClasses) => {
  return {
    type: 'CHANGE_USERDATA',
    payload: takenClasses,
  }
}

const signUpComplete = (userInfo) => (
  crud({
    dispatch: {
      begin: 'BEGIN_LOGIN',
      fail: 'FAILED_LOGIN',
      end: 'END_LOGIN',
    },
    method: 'PUT',
    url: '/new_user',
    data: userInfo,
  })
)

const signUp = (userInfo) => {
  console.log('here');
  return crud({
    dispatch: {
      begin: 'BEGIN_LOGIN',
      fail: 'FAILED_LOGIN',
      end: 'END_LOGIN',
    },
    method: 'PUT',
    url: '/new_user',
    data: userInfo,
  })
}

export {
  login,
  changeTakenClasses,
  signUpComplete
};
