<template>
  <div class="mian">
    <h3>学生个人信息</h3>
    <!-- 学生个人信息表格 -->
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="rules"
    >
      <!-- 姓名 -->
      <el-form-item label="姓名">
        <el-col :span="10">
          <el-input
            v-model="form.truename"
            :disabled="true"
          />
        </el-col>
      </el-form-item>
      <!-- 学号 -->
      <el-form-item label="学号">
        <el-col :span="10">
          <el-input v-model="form.studentID" :disabled="true" />
        </el-col>
      </el-form-item>
      <!-- 电话 -->
      <el-form-item label="联系电话" prop="phone">
        <el-col :span="10">
          <el-input v-model="form.phone" />
        </el-col>
      </el-form-item>
      <!-- 电子邮箱 -->
      <el-form-item label="电子邮箱" prop="email">
        <el-col :span="10">
          <el-input v-model="form.email" />
        </el-col>
      </el-form-item>
      <!-- 学生专业 -->
      <el-form-item label="专业">
        <el-col :span="10">
          <el-input v-model="form.major" :disabled="true" />
        </el-col>
      </el-form-item>
      <!-- 学生个人介绍 -->
      <el-form-item label="个人介绍">
        <el-col :span="10">
          <el-input
            v-model="form.introduction"
            type="textarea"
            :autosize="{ minRows: 6}"
            placeholder="请输入个人简介"
          />
        </el-col>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <!-- 提交信息 -->
        <el-col :span="6">
          <el-button
            type="primary"
            :disabled="isAdmin"
            @click="onSubmit('form')"
          >立即保存</el-button>
        </el-col>
        <!-- 修改密码 -->
        <el-col :span="6">
          <el-button
            type="warning"
            plain
            :disabled="isAdmin"
            @click="dialogFormVisible = true"
          >修改密码</el-button>
        </el-col>
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
        <el-button type="primary" @click="changeStudentPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'

export default {
  data() {
    // 自定义规则
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      if (value) {
        setTimeout(() => {
          var reg = /^[1][3-8][0-9]{9}$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确手机号'))
          } else {
            callback()
          }
        }, 50)
      }
    }
    // 自定义规则邮箱
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      if (value) {
        setTimeout(() => {
          var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
          if (!reg.test(value)) {
            callback(new Error('请输入正确邮箱'))
          } else {
            callback()
          }
        }, 50)
      }
    }
    return {
      isAdmin: false,
      form: {
        truename: null,
        studentID: null,
        phone: null,
        email: null,
        major: null,
        introduction: null
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
      studentInformationUrl: `${process.env.VUE_APP_BASE_API}/information`
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
  // 获取当前信息
  created() {
    const that = this
    const dataForm = that.$data.form
    const token = this.header
    axios.get(`${this.$data.studentInformationUrl}/studentInformation`, {
      // 并保存token到请求头中
      headers: {
        Authorization: token.Authorization
      }
    }).then((res) => {
      if (res.data == '管理员无权访问学生个人信息') {
        this.$alert('管理员无法访问学生的个人信息')
        that.$data.isAdmin = true
      } else {
        const result = res.data.data[0]
        dataForm.truename = result.truename
        dataForm.studentID = result.studentID
        dataForm.phone = result.phone
        dataForm.email = result.email
        dataForm.major = result.major
        dataForm.introduction = result.introduction
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    // 更新信息
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        // 再次前端验证
        if (valid) {
          const token = this.header
          const trueName = this.$data.form.truename
          const newPhone = this.$data.form.phone
          const newEmail = this.$data.form.email
          const newIntroduction = this.$data.form.introduction
          axios({
            url: `${this.$data.studentInformationUrl}/studentChangeInf`,
            method: 'post',
            headers: { Authorization: token.Authorization },
            data: { trueName, newPhone, newEmail, newIntroduction }
          }).then((res) => {
            if (res.data.msg == '修改学生信息成功') {
              this.$message.success('修改学生信息成功，请刷新页面')
            } else {
              this.$message.error('修改学生信息失败，请重试')
            }
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.$message.error('提交失败')
          return false
        }
      }
      )
    },
    // 学生修改密码
    changeStudentPassword() {
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
      } else if (!reg.test(this.$data.ruleForm.password)) {
        this.$notify({
          title: '错误',
          message: '请输入四位以上数字或字符组成的密码',
          type: 'waring'
        })
      } else {
        this.$data.dialogFormVisible = false
        const newPassword = this.$data.ruleForm.password
        const token = this.header
        axios({
          url: `${this.$data.studentInformationUrl}/changeStudentPassword`,
          method: 'post',
          headers: { Authorization: token.Authorization },
          data: { newPassword }
        }).then((res) => {
          if (res.data.msg == '学生修改密码成功') {
            this.$message.success('修改密码成功！')
            this.$data.ruleForm.password = null
            this.$data.ruleForm.confirm = null
          } else {
            this.$message.error('修改密码失败！')
            this.$data.ruleForm.password = null
            this.$data.ruleForm.confirm = null
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
