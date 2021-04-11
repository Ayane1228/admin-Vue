<template>
  <div class="mian">
    <h3>教师个人信息</h3>
    <!-- 教师个人信息 -->
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
    >
      <!-- 姓名,教师无法修改 -->
      <el-form-item label="姓名">
        <el-col :span="10">
          <el-input
            v-model="form.truename"
            :disabled="true"
          />
        </el-col>
      </el-form-item>
      <!-- 职工号,教师无法修改 -->
      <el-form-item label="职工号">
        <el-col :span="10">
          <el-input
            v-model="form.teacherID"
            :disabled="true"
          />
        </el-col>
      </el-form-item>
      <!-- 联系方式 -->
      <el-form-item label="联系电话" prop="phone">
        <el-col :span="10">
          <el-input v-model="form.phone" />
        </el-col>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="电子邮箱" prop="email">
        <el-col :span="10">
          <el-input v-model="form.email" />
        </el-col>
      </el-form-item>
      <!-- 办公室位置 -->
      <el-form-item label="办公室">
        <el-col :span="10">
          <el-input v-model="form.office" />
        </el-col>
      </el-form-item>
      <!-- 职称，管理员禁用 -->
      <el-form-item label="职称">
        <el-col :span="10">
          <el-input
            v-model="form.teacherrank"
            :disabled="flag == 0"
          />
        </el-col>
      </el-form-item>
      <!-- 保存按钮,修改密码(管理员禁用) -->
      <el-form-item>
        <el-col :span="6">
          <el-button type="primary" @click="onSubmit('form')">
            立即保存
          </el-button>
        </el-col>
        <el-button
          type="warning"
          :disabled="flag == 0"
            @click="dialogFormVisible = true"
        >
          修改密码
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 弹出框 -->
    <el-dialog
      title="修改密码:请输入四位以上的数字或字母。"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="ruleForm">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="ruleForm.password" size="small" placeholder="请输入密码" show-password autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm">
          <el-input v-model="ruleForm.confirm" size="small" placeholder="请确认密码" show-password autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeTeacherPassword">确 定</el-button>
      </div>
    </el-dialog>    
  </div>
</template>
<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'

export default {
  data() {
    // 自定义规则-手机
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      if (value) {
        setTimeout(() => {
          var reg = /^[1][3-8][0-9]{9}$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确手机号！'))
          } else {
            callback()
          }
        }, 50)
      }
    }
    // 自定义规则-邮箱
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      if (value) {
        setTimeout(() => {
          var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确邮箱！'))
          } else {
            callback()
          }
        }, 50)
      }
    }
    return {
      // flag 0为管理员,1为教师
      flag: null,
      // 个人信息数据，默认为null
      form: {
        truename: null,
        teacherID: null,
        phone: null,
        email: null,
        office: null,
        teacherrank: null
      },
      ruleForm: {
        password: null,
        confirm: null
      },
      dialogFormVisible: false,      
      rules: {
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }]
      },
      teacherInformationUrl: `${process.env.VUE_APP_BASE_API}/information`
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
  // 获取默认数据
  beforeMount() {
    const that = this
    const dataForm = that.$data.form
    const token = this.header
    // 请求后端数据
    axios.get(`${this.$data.teacherInformationUrl}/teacherInformation`, {
      // 并保存token到请求头中
      headers: {
        Authorization: token.Authorization
      }
    }).then((res) => {
      // 判断管理员还是教师账号
      if (res.data.msg == '获取admin信息成功') {
        that.$data.flag = 0
        this.$message({
          message: '管理员账号',
          center: true
        })
        const result = res.data.data[0]
        dataForm.truename = result.truename
        dataForm.teacherID = result.teacherID
        dataForm.phone = result.phone
        dataForm.email = result.email
        dataForm.office = result.office
        dataForm.teacherrank = result.teacherrank
      } else {
        that.$data.flag = 1
        const result = res.data.data[0]
        dataForm.truename = result.truename
        dataForm.teacherID = result.teacherID
        dataForm.phone = result.phone
        dataForm.email = result.email
        dataForm.office = result.office
        dataForm.teacherrank = result.teacherrank
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    // 提交信息
    onSubmit(form) {
      const token = this.header
      this.$refs[form].validate((valid) => {
        // 再次前端验证
        if (valid) {
          // 判断管理员还是教师
          // 如果是管理员，请求接口adminChangeInf
          if (this.$data.flag === 0) {
            const trueName = this.$data.form.truename
            const newPhone = this.$data.form.phone
            const newEmail = this.$data.form.email
            const newOffice = this.$data.form.office
            axios({
              url: `${this.$data.teacherInformationUrl}/adminChangeInf`,
              method: 'post',
              headers: { Authorization: token.Authorization },
              data: { trueName, newPhone, newEmail, newOffice }
            }).then((res) => {
              this.$message.success(res.data.msg)
            }).catch((err) => {
              console.log(err)
            })
          } else {
            // 教师
            const trueName = this.$data.form.truename
            const newPhone = this.$data.form.phone
            const newEmail = this.$data.form.email
            const newOffice = this.$data.form.office
            const newTeacherrank = this.$data.form.teacherrank
            axios({
              url: 'http://localhost:18082/information/teacherChangeInf',
              method: 'post',
              headers: { Authorization: token.Authorization },
              data: { trueName, newPhone, newEmail, newOffice, newTeacherrank }
            }).then((res) => {
              if (res.data.msg == '修改教师信息成功') {
                this.$message.success('修改教师信息成功，请刷新页面')
              } else {
                this.$message.error('修改教师信息失败，请重试')
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        } else {
          this.$message.error('提交失败')
          return false
        }
      }
      )
    },
    // 修改密码
    changeTeacherPassword() {
      var reg = /^[0-9a-zA-Z]{4,}$/
      if (this.$data.ruleForm.password == null || this.$data.ruleForm.confirm == null) {
        this.$notify({
          title: '错误',
          message: '密码不能为空,请重新输入',
          type: 'warning'
        })
        this.$data.ruleForm.password = null
        this.$data.ruleForm.confirm = null
      } else if (this.$data.ruleForm.password != this.$data.ruleForm.confirm) {
        this.$notify({
          title: '错误',
          message: '两次密码不一致，请重新输入',
          type: 'warning'
        })
        this.$data.ruleForm.password = null
        this.$data.ruleForm.confirm = null
      } else if (!reg.test(this.$data.ruleForm.password)) {
        this.$notify({
          title: '错误',
          message: '请输入四位以上数字或字符的密码',
          type: 'waring'
        })
      } else {
        this.$data.dialogFormVisible = false
        const newPassword = this.$data.ruleForm.password
        const token = this.header
        axios({
          url: `${this.$data.teacherInformationUrl}/changeTeacherPassword`,
          method: 'post',
          headers: { Authorization: token.Authorization },
          data: { newPassword }
        }).then((res) => {
          if (res.data.msg == '教师修改密码成功') {
            this.$message.success('修改密码成功!')
          } else {
            this.$message.error('修改密码失败！')
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
}

</script>

<style>
  h3{
    margin-left: 20px;
  }
  .mian{
    padding-left: 50px;
  }
  #showMore{
    margin-left: 10px;
  }
</style>
