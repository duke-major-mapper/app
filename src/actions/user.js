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

export {
  login,
};
