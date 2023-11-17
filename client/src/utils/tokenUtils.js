// tokenUtils.js
export function getAccessToken () {
    return localStorage.getItem('accessToken') || null
  }
  
  // tokenUtils.js
  export function clearAccessToken () {
    localStorage.removeItem('accessToken')
  }
  