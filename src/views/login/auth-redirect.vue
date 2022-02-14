<script>
import { getQueryObject } from '@/utils'
export default {
  name: 'AuthRedirect',
  created() {
    const hash = window.location.hash.slice(1)
    const oauth = getQueryObject(hash)
    if (window.localStorage) {
      window.localStorage.setItem('x-admin-oauth-code', JSON.stringify(oauth))
      window.close()
    }
  },
  render: function(h) {
    return h('div', '三方登录重定向') // avoid warning message
  }
}
</script>
