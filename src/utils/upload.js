import { getSchoolId, getToken } from './auth'

export default {
  action: process.env.VUE_APP_BASE_API + '/admin/s/upload',
  headers: {
    token: getToken(),
    schoolid: getSchoolId()
  }
}
