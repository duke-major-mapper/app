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
    push: '/home',
    data: {
      netID: netID,
      password: password
    }
  })
);

const logout = (netID) => (
  crud({
    dispatch: {
      begin: 'BEGIN_LOGOUT',
      fail: 'FAILED_LOGOUT',
      end: 'END_LOGOUT',
    },
    method: 'PUT',
    url: '/logout',
    push: '/login',
    data: {
      netID: netID
    }
  })
);

const myClasses = (netID) => (
  crud({
    dispatch: {
      begin: 'BEGIN_GET_MY_CLASSES',
      fail: 'FAILED_GET_MY_CLASSES',
      end: 'END_GET_MY_CLASSES',
    },
    method: 'GET',
    url: '/my_classes?net_id=' + netID
  })
)

const updateMyClasses = (classIDs) => (
  crud({
    dispatch: {
      begin: 'BEGIN_PUT_MY_CLASSES',
      fail: 'FAILED_PUT_MY_CLASSES',
      end: 'END_PUT_MY_CLASSES',
    },
    method: 'PUT',
    data: takenClasses,
    url: '/major_classes',
  })
)

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
  logout,
  myClasses,
  changeTakenClasses,
  signUpComplete
};
