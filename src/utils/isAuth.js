const isAuth = ({ store, history, component, loginComponent }) => {
  const state = store.getState('user');
  const user = state.user;
  if (user.netID === '') {
    history.push('/login');
    return loginComponent;
  } else {
    return component;
  }
}

export default isAuth;
