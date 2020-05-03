<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div style="margin-top: 15px;">
          <el-row :gutter="20">
            <el-col :span="7">
              <el-input placeholder="请输入内容">
                <el-button type="success" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="margin-top: 15px;">
        <el-table :data="userList" style="width: 100%" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="loginName" label="登录名" width="180"></el-table-column>
          <el-table-column prop="realName" label="姓名" width="180"></el-table-column>
          <el-table-column prop="birthday" label="生日" width="180"></el-table-column>
          <el-table-column prop="phone" label="电话" width="180"></el-table-column>
          <el-table-column prop="genderText" label="性别" width="180"></el-table-column>
          <el-table-column label="状态" width="180">
            <template slot-scope="scope">
              <i v-if="scope.row.state == 0" class="el-icon-success" style="color: #67C23A">有效</i>
              <i v-if="scope.row.state == 1" class="el-icon-error" style="color: #F56C6C">已禁用</i>
              <i v-if="scope.row.state == 2" class="el-icon-delete-solid" style="color: #E6A23C">已删除</i>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="mini" :disabled="scope.row.state === 2"
              type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.tid)">修改</el-button>
              <el-button size="mini" :disabled="scope.row.state !== 0" type="success" icon="el-icon-s-check">授权</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top: 15px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.currPage"
        :page-sizes="[10, 20, 30, 100]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
      </div>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="loginName">
          <el-input v-model="addForm.loginName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="addForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="addForm.gender" placeholder="请选择">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="addForm.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%">
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="70px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="loginName">
          <el-input v-model="editForm.loginName" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="editForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="editForm.gender" placeholder="请选择">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="editForm.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-switch v-model="editForm.state" :active-value="0" :inactive-value="1" @change="changeState(editForm.state)"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      genderOptions: [
        {
          value: 1,
          label: '男'
        },
        {
          value: 0,
          label: '女'
        }
      ],
      queryInfo: {
        query: '',
        currPage: 1,
        pageSize: 10
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      // 修改用户
      editDialogVisible: false,
      addForm: {
        loginName: '',
        realName: '',
        password: '',
        gender: '',
        phone: ''
      },
      editForm: {},
      addFormRules: {
        loginName: [
          { required: true, message: '用户名必填', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const res = await this.$http.get('/webapi/userserver/innerUser/v1/page', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error(res.data.msg)
      }
      if (res.data.code === 1) {
        return this.$message.error(res.data.msg)
      }
      this.userList = res.data.data.List
      this.total = res.data.data.Page.dataCount
    },
    async addUser () {
      const res = await this.$http.post('/webapi/userserver/innerUser/v1/', this.addForm)
      if (res.status !== 200) {
        return this.$message.error(res.data.msg)
      }
      if (res.data.code === 1) {
        return this.$message.error(res.data.msg)
      }
      this.addDialogVisible = false
      this.$message.success(res.data.msg)
    },
    async getUserById (tid) {
      const res = await this.$http.get('/webapi/userserver/innerUser/v1/' + tid)
      console.log('更新用户')
      console.log(res)
      if (res.status !== 200) {
        return this.$message.error(res.data.msg)
      }
      if (res.data.code === 1) {
        return this.$message.error(res.data.msg)
      }
      this.editForm = res.data.data
    },
    async updateUser () {
      const res = await this.$http.put('/webapi/userserver/innerUser/v1/', this.editForm)
      if (res.status !== 200) {
        return this.$message.error(res.data.msg)
      }
      if (res.data.code === 1) {
        return this.$message.error(res.data.msg)
      }
      this.editDialogVisible = false
      this.$message.success(res.data.msg)
      this.getUserList()
    },
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.currPage = newPage
      this.getUserList()
    },
    showEditDialog (tid) {
      this.editDialogVisible = true
      this.getUserById(tid)
    },
    changeState (state) {
      if (state === 1) {
        this.$message.warning({ message: '禁用该用户！', duration: 10000, showClose: true })
      } else if (state === 0) {
        this.$message.success({ message: '启用该用户！', duration: 10000, showClose: true })
      }
    }
  }
}

</script>
<style lang="less" scoped>

</style>
