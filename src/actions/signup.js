export const changeName = (newValue) => {
  return {
    type: 'CHANGE_NAME',
    payload: newValue,
  }
}

export const changeNetID = (newValue) => {
  return {
    type: 'CHANGE_NETID',
    payload: newValue,
  }
}

export const changePassword = (newValue) => {
  return {
    type: 'CHANGE_PASSWORD',
    payload: newValue,
  }
}

export const changeError = (newValue) => {
  return {
    type: 'CHANGE_ERROR',
    payload: newValue,
  }
}
