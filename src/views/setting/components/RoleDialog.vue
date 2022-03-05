<template>
  <div class="">
    <el-dialog
      title="查看权限"
      top="2%"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="handleClosed"
    >

      <div v-loading="loading" class="role-dialog-content">
        <div class="role-row">
          <div class="role-title">角色名称:</div>
          <div class="role-desc">{{ roleData.name }}</div>
        </div>
        <div class="role-row">
          <div class="role-title">菜单:</div>
          <div class="role-desc">
            <el-tree
              ref="menuTreeCom"
              :data="menuList"
              :default-checked-keys="roleData.menusId"
              :show-checkbox="isplatform"
              node-key="id"
              :props="{ children: 'children',
                        label: 'title'}"
            />
          </div>
        </div>
        <div class="role-row">
          <div class="role-title">权限:</div>
          <div class="role-desc">
            <el-tree
              ref="roleTreeCom"
              :data="roleList"
              :show-checkbox="isplatform"
              :default-checked-keys="roleData.accessesId"
              node-key="id"
              :props="{ children: 'children',
                        label: 'title'}"
            />
          </div>
        </div>
      </div>

      <div v-if="isplatform" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRolePermissionApi, getRoleListByTypeApi, setPermissionsToRolesApi, getRoleListByIdApi } from '@/api/role'
import { clone, mapTree } from 'xe-utils'
import Axios from 'axios'
export default {
  components: {},
  inject: ['getList'],
  data() {
    return {
      loading: false,
      dialogVisible: false,
      menuList: [], // 所有菜单 tree
      roleList: [], // 所有role tree
      roleId: '',
      // 该角色权限详情
      roleData: {
        name: '',
        role_id: '',
        accessesId: [], // 当前选中的role
        menusId: [] // 当前选中的menus
      }
    }
  },
  computed: {
    isplatform() {
      return this.$store.getters.isplatform
    }
  },
  methods: {
    // 根据当前id查看角色权限
    async getRolePermission(id) {
      this.roleId = id
      const { data } = await getRoleListByIdApi(id)
      this.roleData = data
    },
    // 查看所有菜单权限列表
    async getRoleMenu() {
      const { data } = await getRoleListByTypeApi('menu')
      this.menuList = data.items
    },
    // 查看所有角色权限列表
    async getRoleList(id) {
      const { data } = await getRoleListByTypeApi('rule')
      this.roleList = data.items
    },
    async handleConfirm() {
      const menuKeys = this.$refs.menuTreeCom.getCheckedKeys()
      const roleKeys = this.$refs.roleTreeCom.getCheckedKeys()
      const access_ids = [...menuKeys, ...roleKeys].map(it => +it)
      try {
        this.loading = true
        const params = {}
        params.access_ids = access_ids
        params.role_id = this.roleId
        await setPermissionsToRolesApi(params)
        await this.getList()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      } catch (error) {
        this.dialogVisible = false
      }
      this.loading = false
      this.dialogVisible = false
    },

    async open(id) {
      this.id = id
      this.loading = true
      this.dialogVisible = true
      Axios.all([
        this.getRolePermission(id),
        this.getRoleMenu(),
        this.getRoleList()
      ]).finally(() => {
        this.loading = false
      })
    },
    close() {
      this.dialogVisible = false
    },
    handleClosed() {
      Object.assign(this.$data, this.$options.data())
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
  margin-bottom: 40px;
  .role-title{
    font-weight: bold;
    width: 100px;
  }
  .role-desc{
  }
}
</style>
