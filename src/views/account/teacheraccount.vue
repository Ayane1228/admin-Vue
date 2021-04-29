<template>
  <div>
    <!-- 添加部分 -->
    <div class="top">
      <h3>添加教师账号</h3>
      <div class="topMain">
        <el-form ref="newTeacherForm" label-width="80px" :model="newTeacherForm" :rules="rules" class="demo-form-inline">
          <!-- 账号 -->
          <el-col :span="5">
            <el-form-item label="账号" prop="newAccount">
              <el-input v-model="newTeacherForm.newAccount" placeholder="账号" />
            </el-form-item>
          </el-col>
          <!-- 密码 -->
          <el-col :span="5">
            <el-form-item label="密码" prop="newPassword">
              <el-input v-model="newTeacherForm.newPassword" placeholder="密码" show-password />
            </el-form-item>
          </el-col>
          <!-- 姓名 -->
          <el-col :span="5">
            <el-form-item label="姓名" prop="newName">
              <el-input v-model="newTeacherForm.newName" placeholder="姓名" />
            </el-form-item>
          </el-col>
          <!-- 工号 -->
          <el-col :span="5">
            <el-form-item label="工号" prop="newTeacherID">
              <el-input
                type="number"
                v-model.number="newTeacherForm.newTeacherID"
                placeholder="工号"
              />
            </el-form-item>
          </el-col>
          <!-- 确认添加按钮 -->
          <el-col :span="11">
            <el-form-item>
              <el-button type="primary" @click="addNewTeacher('newTeacherForm')">确认添加</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
    </div>
    <!-- 数据展示部分 -->
    <div class="showTeacher">
      <h3>老师账号信息</h3>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <!-- 手风琴部分 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="账号">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="密码">
                <span>{{ props.row.password }}</span>
              </el-form-item>
              <el-form-item label="姓名">
                <span>{{ props.row.truename }}</span>
              </el-form-item>
              <el-form-item label="工号">
                <span>{{ props.row.teacherID }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="职称">
                <span>{{ props.row.teacherrank }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 主要部分 -->
        <!-- 账号 -->
        <el-table-column
          label="账号名"
          prop="username"
        />
        <!-- 密码 -->
        <el-table-column
          label="密码"
          prop="password"
        />
        <!-- 姓名 -->
        <el-table-column
          label="教师姓名"
          prop="truename"
        />
        <!-- 工号 -->
        <el-table-column
          label="工号"
          prop="teacherID"
        />
        <!-- 职称 -->
        <el-table-column
          label="职称"
          prop="teacherrank"
        />
        <!-- 修改密码 -->
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="changepassword(scope.$index, scope.row)"
            >
              修改密码
            </el-button>
          </template>
        </el-table-column>
        <!-- 删除账号-->
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="deleteTeacher(scope.$index, scope.row)"
            >
              删除账号
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
  data() {
    // 自定义规则-账号只能为数字，字母，下划线
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      if (value) {
        setTimeout(() => {
          var reg = /^[0-9a-zA-Z_]{1,}$/
          if (!reg.test(value)) {
            callback(new Error('请输入数字、字母、下划线'))
          } else {
            callback()
          }
        }, 50)
      }
    }
    // 自定义规则-密码
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      if (value) {
        setTimeout(() => {
          var reg = /^[0-9a-zA-Z]{4,}$/
          if (!reg.test(value)) {
            callback(new Error('请输入四位以上的数字或字母'))
          } else {
            callback()
          }
        }, 50)
      }
    }
    return {
      // 新增数据
      newTeacherForm: {
        newAccount: null,
        newPassword: null,
        newName: null,
        newTeacherID: null
      },
      // 验证规则
      rules: {
        newAccount: [
          { required: true, message: '请输入账号名', trigger: 'blur' },
          { validator: checkAccount, trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, message: '密码长度最小为4个字符', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        newName: [
          { required: true, message: '请输入教师姓名', trigger: 'blur' }],
        newTeacherID: [
          { required: true, message: '请输入工号', trigger: 'blur' },
          { type: 'number', message: '工号必须为数字' }]
      },
      tableData: [],
      teacherAccountUrl: `${process.env.VUE_APP_BASE_API}/TeacherAccount`
    }
  },
  // 计算属性获取token
  computed: {
    header() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  // 查询数据
  created() {
    const that = this
    const token = this.header
    // 请求后端数据
    axios.get(`${this.$data.teacherAccountUrl}/showTeacherAccount`, {
      // 并保存token到请求头中
      headers: { Authorization: token.Authorization }
    }).then(function(res) {
      // 保存到data中
      res.data.data.map((item) => {
        // 显示数据
        that.$data.tableData.push(item)
      })
    }).catch(err => { console.log(err) })
  },
  methods: {
    // 添加教师账号
    addNewTeacher(newTeacherForm) {
      this.$refs[newTeacherForm].validate((valid) => {
        // 通过前端验证
        if (valid) {
          const token = this.header
          const newTAccount = this.$data.newTeacherForm.newAccount
          const newTPassword = this.$data.newTeacherForm.newPassword
          const newTName = this.$data.newTeacherForm.newName
          const newTeacherID = this.$data.newTeacherForm.newTeacherID
          axios({
            url: `${this.$data.teacherAccountUrl}/addTeacherAccount`,
            method: 'post',
            headers: { Authorization: token.Authorization },
            data: { newTAccount, newTPassword, newTName, newTeacherID }
          }).then((res) => {
            if (res.data.msg == '账号名已存在,请重新尝试') {
              this.$message.error(`${res.data.msg}`)
            } else {
              this.$message.success(res.data.msg)
            }
          }).catch((err) => {
            console.log(err)
          })
        }
        // 不符合rules
        else {
          this.$message.error('提交失败')
          return false
        }
      })
    },
    // 修改密码
    changepassword(index, row) {
      const TeacherUsername = row.username
      this.$prompt('请输入新密码', '重置密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value.length < 4) {
          this.$message.error('新密码不能小于四位')
        } else {
          const token = this.header
          axios({
            url: `${this.$data.teacherAccountUrl}/changeTeacherAccount`,
            method: 'post',
            headers: { Authorization: token.Authorization },
            data: { value, TeacherUsername }
          }).then((res) => {
            this.$message.success(res.data.msg)
          }).catch((err) => {
            this.$message.error(err.data.msg)
          })
        }
      }).catch((err) => {
        this.$message.info('取消输入')
      })
    },
    // 删除教师账号
    deleteTeacher(index, row) {
      if (row.username === 'admin') {
         this.$message.error('无法删除管理员账号');
      } else {
        const deleteTeacherAccountName = row.username
        const token = this.header
        this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            url: `${this.$data.teacherAccountUrl}/deleteTeacher`,
            method: 'post',
            headers: { Authorization: token.Authorization },
            data: { deleteTeacherAccountName }
          }).then((res) => {
            // 判断是否有相关选题
            if (res.data.msg == '删除账号存在相关选题存在，禁止删除账号！') {
              this.$message.error(`${res.data.msg}`)
            } else {
              this.$message.success(`${res.data.msg}`)
            }
          }).catch((err) => {
            console.log(err)
          })
        }).catch(() => {
          this.$message.info('取消删除')
        })
      } 
    }
  }
}
</script>

<style>
  .top{
    margin-bottom: 50px;
  }
  h3{
    margin-left: 20px;
  }
 .topMain{
   width: 1200px;
   margin-left: 20px ;
 }
 .showTeacher{
   margin-top: 180px;
 }
 .el-input--suffix{
   display: inline;
   width: 200px;
 }
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
