<template>
  <div class="">
    <el-dialog
      title="查看权限"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="handleClosed"
    >

      <div class="role-dialog-content">
        <div class="role-row">
          <div class="role-title">角色名称:</div>
          <div class="role-desc">{{ roleData.name }}</div>
        </div>
        <div class="role-row">
          <div class="role-title">菜单:</div>
          <div class="role-desc">
            <el-tree
              :props="{ children: 'children',
                        label: 'title'}"
              :data="roleData.menus"
            />
          </div>
        </div>
        <div class="role-row">
          <div class="role-title">权限:</div>
          <div class="role-desc">
            <el-tree
              :props="{ children: 'children',
                        label: 'title'}"
              :data="roleData.menus"
            />
          </div>
        </div>
      </div>

      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRolePermissionApi } from '@/api/role'
import { clone } from 'xe-utils'
export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      roleData: {
        name: '',
        role_id: '',
        menus: []
      } // 该角色权限详情
    }
  },
  methods: {
    // 查看角色权限
    async getRolePermission(id) {
      const { data } = await getRolePermissionApi(id)
      console.log(data)
      this.roleData = data
    },
    async open(id) {
      this.id = id
      await this.getRolePermission(id)
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      Object.assign(this.$data.roleData, this.$options.data().roleData)
    }
  }
}
</script>
<style scoped lang="scss">
.role-dialog-content{
  height: 500px;
  overflow-y: auto;
}
.role-row{
  display: flex;
  line-height: 30px;
  margin-bottom: 40px;
  .role-title{
    font-weight: bold;
    width: 100px;
  }
  .role-desc{
  }
}
</style>
