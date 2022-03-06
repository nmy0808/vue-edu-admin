import { getSchoolId, getToken } from './auth'

export default {
  action: process.env.VUE_APP_BASE_API + '/admin/s/upload',
  importExcelAction: process.env.VUE_APP_BASE_API + '/admin/s/importexcel',
  headers: {
    token: getToken(),
    schoolid: getSchoolId()
  }
}
