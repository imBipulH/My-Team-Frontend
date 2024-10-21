export const checkAdminStatus = () => {
  const token = localStorage.getItem('authToken')
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    if (decodedToken.role === 'admin') {
      return true
    } else {
      return false
    }
  }
}
