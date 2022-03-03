import Cookies from 'js-cookie'

const TokenKey = '___Admin-Token___'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getSchoolId() {
  return Cookies.get('schoolid')
}

export function setSchoolId(schoolid) {
  return Cookies.set('schoolid', schoolid)
}

export function removeSchoolId() {
  return Cookies.remove('schoolid')
}
