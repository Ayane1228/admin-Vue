<template>
  <div class="mian">
    <h3>学生个人信息</h3>
    <!-- 学生个人信息表格 -->
    <el-form 
      ref="form" 
      :model="form" 
      label-width="80px" 
      :rules="rules">
      <!-- 姓名 -->
      <el-form-item label="姓名">
        <el-col :span="10">
        <el-input 
          v-model="form.truename"  
          :disabled="true" ></el-input>
          </el-col>
      </el-form-item>
      <!-- 学号 -->
      <el-form-item label="学号">
        <el-col :span="10">
        <el-input v-model="form.studentID"  :disabled="true"></el-input>
        </el-col>
      </el-form-item>
      <!-- 电话 -->
      <el-form-item label="联系电话" prop="phone">
          <el-col :span="10">
            <el-input v-model="form.phone"></el-input>
          </el-col>
      </el-form-item>
      <!-- 电子邮箱 -->
      <el-form-item label="电子邮箱" prop="email">
        <el-col :span="10">
          <el-input v-model="form.email"></el-input>
        </el-col>
      </el-form-item>
      <!-- 学生专业 -->
      <el-form-item label="专业">
        <el-col :span="10">
          <el-input v-model="form.major" :disabled="true"></el-input>
        </el-col>
      </el-form-item>
      <!-- 学生个人介绍 -->
      <el-form-item label="个人介绍">
        <el-col :span="10">
          <el-input
          type="textarea"
          :autosize="{ minRows: 6}"
          placeholder="请输入个人简介"
          v-model="form.introduction">
        </el-input>
        </el-col>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <!-- 提交信息 -->
        <el-col :span="6">
          <el-button type="primary" @click="onSubmit('form')">立即保存</el-button>
        </el-col>
        <!-- 修改密码 -->
        <el-col :span="6">
          <el-button type="warning" plain @click="changeStudentPassword">修改密码</el-button>
        </el-col>
      </el-form-item>
    </el-form>
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
                return callback();
            }
            if (value) {
                setTimeout(() => {
                    var reg = /^[1][3-8][0-9]{9}$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入正确手机号'));
                    } else {
                        callback();
                    }
                }, 50);
            }
      };
      // 自定义规则邮箱
      var checkEmail = (rule, value, callback) => {
            if (!value) {
                return callback();
            }
            if (value) {
                setTimeout(() => {
                    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入正确邮箱'));
                    } else {
                        callback();
                    }
                }, 50);
            }
      };
      return {
        form: {
          truename:null,
          studentID:null,
          phone:null,
          email:null,
          major:null,
          introduction:null
        },
         rules: {
            phone:[{ validator: checkPhone, trigger: 'blur'  }],
            email:[{ validator: checkEmail, trigger: 'blur'  }]
         }
      }
  },    
  methods:{
    // 更新信息 
    onSubmit(form){
        this.$refs[form].validate( (valid) => {
        // 再次前端验证
        if (valid) {
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
              if (res.data.msg == '修改学生信息成功' ) {
                this.$message.success('修改学生信息成功，请刷新页面')
              } else {
                this.$message.error('修改学生信息失败，请重试')
              }
            }).catch( (err) => {
              console.log(err);
            })
        } else {
          this.$message.error('提交失败')
          return false;
          }
        }
      )
    },
    // 学生修改密码
    changeStudentPassword(){
      this.$prompt('请输入新密码', '修改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if( value.length < 4 ){
            this.$message({
              type: 'error',
              message: '新密码必须大于四位!'
            });
          } else {
            const token = this.header
            axios({
              url:'http://localhost:18082/information/changeStudentPassword',
              method:'post',
              headers:{ Authorization:token.Authorization },
              data:{value}
           }).then( (res) => {
             if( res.data.msg == "学生修改密码成功") {
              this.$message.success('修改密码成功！')
             } else {
               this.$message.error('修改密码失败！')
             }
           }).catch( (err) => {
             console.log(err);
           })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
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
    // 获取当前信息
    beforeMount() {
      const that = this
      const dataForm = that.$data.form
      const token = this.header
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
