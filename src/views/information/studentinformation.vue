<template>
  <div class="mian">
    <h3>学生个人信息</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-col :span="10">
        <el-input 
          v-model="form.truename"  
          :disabled="true" ></el-input>
          </el-col>
      </el-form-item>
      
      <el-form-item label="学号">
        <el-col :span="10">
        <el-input v-model="form.studentID"  :disabled="true"></el-input>
        </el-col>
      </el-form-item>
      
      
      <el-form-item label="联系电话">
          <el-col :span="10">
            <el-input v-model="form.phone"></el-input>
          </el-col>
      </el-form-item>
      
      <el-form-item label="电子邮箱">
        <el-col :span="10">
          <el-input v-model="form.email"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="专业">
        <el-col :span="10">
          <el-input v-model="form.major" :disabled="true"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="个人简介">
        <el-col :span="10">
          <el-input
          type="textarea"
          :autosize="{ minRows: 6}"
          placeholder="请输入个人简介"
          v-model="form.introduction">
        </el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'

export default {
      data() {
      return {
        form: {
          truename:null,
          studentID:null,
          phone:null,
          email:null,
          major:null,
          introduction:null
        }
      }
  },    
  methods:{
    // 提示保存成功
    change() {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      },
    onSubmit(){
      this.change()
      const token = this.header
      const trueName = this.$data.form.truename
      const newPhone = this.$data.form.phone
      const newEmail = this.$data.form.email
      const newIntroduction = this.$data.form.introduction
        axios({
          url:'http://localhost:18082/information/studentChangeInf',
          method:"post",
          headers:{ Authorization:token.Authorization },
          data:{ trueName,newPhone,newEmail,newIntroduction }
        }).then( (res) => {
          console.log(res);
        }).catch( (err) => {
          console.log(err);
        })
    }
  },
  //计算属性获取token
    computed:{
      header(){
        return {
          Authorization:`Bearer ${getToken()}`
        }
      }
    },
    beforeMount() {
      const that = this
      const dataForm = that.$data.form
      const token = this.header
      // 请求后端数据
      axios.get('http://localhost:18082/information/studentInformation',{
            // 并保存token到请求头中
            headers:{
              Authorization:token.Authorization
            }
        }).then( (res) =>{
          if (res.data == '管理员无权访问学生个人信息') {
            // 重定向
            window.location.href = 'http://localhost:9527/index.html#/information/errorinformation'
          } else {
              const result = res.data.data[0]
              dataForm.truename = result.truename
              dataForm.studentID = result.studentID
              dataForm.phone = result.phone
              dataForm.email = result.email
              dataForm.major = result.major              
              dataForm.introduction = result.introduction
          }
        }).catch( (err) => {
          console.log(err);
        })
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
