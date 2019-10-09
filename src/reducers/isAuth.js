const isAuthorized = (state = false, action) => {
  switch(action.type) {
    case 'AUTHORIZE':
      return state = true
    default:
      return state
  }
}

export default isAuthorized;