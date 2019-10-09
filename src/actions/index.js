export const videoGetter = (videos) => {
  return {
    type: 'GET_RESULTS',
    data: videos
  }
} 

export const authorize = () => {
  return {
    type: 'AUTHORIZE',
  }
} 