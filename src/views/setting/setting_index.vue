<template>
  <div v-loading="loading" class="app-container settingIndex-page">
    <div class="setting-row">
      <div class="setting-col-left">店铺名称</div>
      <div class="setting-col-right border-bottom">
        {{ school.name }}
        <el-button
          type="text"
          class="fr"
          @click="handleSchoolName"
        >编辑</el-button>
      </div>
    </div>
    <div class="setting-row">
      <div class="setting-col-left">店铺地址</div>
      <div class="setting-col-right border-bottom">
        {{ school.weburl }}
        <el-button
          v-if="school.weburl"
          type="text"
          class="fr"
          @click="handleCopy"
        >复制地址</el-button>
      </div>
    </div>
    <div class="setting-row">
      <div class="setting-col-left">店铺管理员</div>
      <div class="setting-col-right border-bottom">
        {{ school.user?school.user.username:'' }}
      </div>
    </div>
    <div class="setting-row">
      <div class="setting-col-left">店铺appid</div>
      <div class="setting-col-right border-bottom">
        {{ school.appid }}
      </div>
    </div>
  </div>
</template>
<script>

import { getSchoolInfoApi, updateSchoolApi } from '@/api/school'
import { getSchoolId } from '@/utils/auth'
import clip from '@/utils/clipboard'

export default {
  components: {},
  data() {
    return {
      loading: false,
      school: {}
    }
  },
  computed: {},
  created() {
    this.getSchoolUserInfo()
  },
  methods: {
    /**
     * 获取当前店铺设置
     */
    async getSchoolUserInfo() {
      this.loading = true
      getSchoolInfoApi(getSchoolId())
        .then(({ data }) => {
          this.school = data
        }).finally(() => {
          this.loading = false
        })
    },
    handleSchoolName() {
      this.$prompt('请输入新的网校名称', '修改', {
        inputValue: this.school.name,
        confirmButtonText: '提交',
        cancelButtonText: '取消'
      }).then(async({ value }) => {
        const params = {}
        params.name = value
        params.id = getSchoolId()
        await updateSchoolApi(params)
        this.school.name = value
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }).catch(err => err)
    },
    handleCopy(e) {
      clip(this.school.weburl, e)
    }
  }
}
</script>
<style lang="scss" scoped>
.settingIndex-page{
    display:flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5%;
  .setting-row{
    height: 60px;
    display: flex;
    align-items: center;
  }
  .setting-col-left{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 120px;
    height: 100%;
    line-height: 60px;
    font-weight: bold;
  }
  .setting-col-right{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    height: 100%;
    line-height: 60px;

  }
}

</style>
