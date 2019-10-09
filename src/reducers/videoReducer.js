const videoReducer = (state = [], action) => {
  switch(action.type) {
    case 'GET_RESULTS':
      return state = action.data
    default:
      return state
  }
}

export default videoReducer;