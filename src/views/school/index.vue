<template>
  <div class="school-page">
    <navbar is-school-page />
    <el-button
      class="m-4 my-0 mt-3"
      type="primary"
      icon="el-icon-plus"
      @click="$refs.schoolDialogCom.open()"
    >新增网校</el-button>
    <div class="app-container d-flex flex-wrap w-100">
      <el-row :gutter="10">
        <el-col
          v-for="item in list"
          :key="item.id"
          :span="6"
        >
          <el-card>
            <div class=" d-flex align-items-center justify-content-between">
              <div class="school-title">{{ item.name }}</div>
              <el-button type="text" @click="toPageHome(item)">进入</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getSchoolList"
    />
    <school-dialog ref="schoolDialogCom" />
  </div>

</template>
<script>
import { Navbar } from '@/layout/components'
import { getSchoolListApi } from '@/api/school'
import SchoolDialog from './components/SchoolDialog.vue'
import Pagination from '@/components/Pagination'
import { setSchoolId } from '@/utils/auth'

export default {
  provide() {
    return {
      getList: this.getSchoolList
    }
  },
  components: { Navbar, Pagination, SchoolDialog },
  data() {
    return {
      list: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      total: 0
    }
  },
  created() {
    this.getSchoolList()
  },
  methods: {
    async getSchoolList() {
      this.listLoading = true
      const { data } = await getSchoolListApi(this.listQuery)
      this.listLoading = false
      this.list = data.items
      this.total = data.total
    },
    toPageHome(item) {
      const schoolid = item.id
      setSchoolId(schoolid)
      this.$router.push({ name: 'Dashboard' })
    }
  }
}
</script>
<style scoped lang="scss">
.school-page {
  min-width: 1100px;
  .el-card{
    margin-bottom: 20px;
    .school-title{
      font-size: 18rpx;//自适应字体
      display: -webkit-box;//盒子类型
      word-break: break-all;//自动换行的处理方法。允许在单词内换行
      text-overflow: ellipsis;//溢出时用...
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp:1;//行数
    }
  }
}
</style>
