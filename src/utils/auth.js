import Cookies from 'js-cookie'

const TokenKey = 'QYS-admin'

const JWT = 'QYS-JWT'

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function getToken() {
  return Cookies.get(TokenKey)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setCookieJwt(jwt) {
  return Cookies.set(JWT, jwt)
}
export function getCookieJwt() {
  return Cookies.get(JWT)
}
export function removeCookieJwt() {
  return Cookies.remove(JWT)
}
