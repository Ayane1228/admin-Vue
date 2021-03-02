<template>
  <div>
    <div class="top">
      <h3>添加教师账号</h3>
      <div class="topMain">
        <el-form label-width="80px" :model="newTeacherForm" :rules="rules" ref="newTeacherForm" class="demo-form-inline">
        <el-col :span="5">
          <el-form-item label="账号" prop="newAccount" >
            <el-input v-model="newTeacherForm.newAccount" placeholder="账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="密码" prop="newPassword" >
            <el-input v-model="newTeacherForm.newPassword" placeholder="密码" show-password></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="姓名"  prop="newName">
            <el-input v-model="newTeacherForm.newName" placeholder="姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="工号"  prop="newTeacherID">
            <el-input v-model="newTeacherForm.newTeacherID" placeholder="工号"></el-input>
          </el-form-item>        
        </el-col>
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
    style="width: 100%">
    <!-- 下拉部分 -->
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
            <span>{{ props.row.phone}}</span>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <span>{{ props.row.email}}</span>
          </el-form-item>
          <el-form-item label="职称">
            <span>{{ props.row.teacherrank}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <!-- 账号 -->
    <el-table-column
        label="账号名"
        prop="username">
    </el-table-column>
    <!-- 密码 -->
    <el-table-column
        label="密码"
        prop="password">
    </el-table-column>
    <!-- 姓名 -->
    <el-table-column
        label="姓名"
        prop="truename">
    </el-table-column>
    <!-- 修改密码 -->
    <el-table-column>
          <template slot-scope="scope">
            <el-button 
              type="primary" 
              @click="changepassword(scope.$index, scope.row)">
              修改密码
            </el-button>
          </template>
    </el-table-column>
    <!-- 删除账号-->
    <el-table-column>
        <template slot-scope="scope">
          <el-button 
              type="danger" 
              @click="deleteTeacher(scope.$index, scope.row)">
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
      return {
        // 新增数据
        newTeacherForm: {
          newAccount: null,
          newPassword: null,
          newName:null,
          newTeacherID:null
        },
        // 验证规则
        rules:{
          newAccount:[{ required: true, message: '请输入账号名', trigger: 'blur' }],
          newPassword:[
            {required: true, message: '请输入密码', trigger: 'blur'},
            { min: 4, message: '密码长度最小为4个字符', trigger: 'blur' }
          ],
          newName:[
            {required: true, message: '请输入教师姓名', trigger: 'blur'}
          ],
          newTeacherID:[{required: true, message: '请输入工号', trigger: 'blur'}],
        },
        tableData: []
      }
    },
    methods:{
      // 添加账号
      addNewTeacher(newTeacherForm) {
        this.$refs[newTeacherForm].validate((valid) => {
        // 通过前端验证
        if (valid) {
          this.$message({
          message: '提交成功',
          type: 'success'
        })
        const token = this.header
        const newTAccount = this.$data.newTeacherForm.newAccount
        const newTPassword = this.$data.newTeacherForm.newPassword
        const newTName = this.$data.newTeacherForm.newName
        const newTeacherID = this.$data.newTeacherForm.newTeacherID
        axios({
            url:'http://localhost:18082/TeacherAccount/addTeacherAccount',
            method:'post',
            headers:{ Authorization:token.Authorization },
            data:{newTAccount,newTPassword,newTName,newTeacherID}
        }).then ( (res) => {
          console.log(0);
          console.log(res);
        }).catch( (err) => {
          console.log(1);
          console.log(err);
        })
        } 
        //不符合rules
        else {
          this.$message({
          message: '提交失败',
          type: 'error'
        })
            return false;
          }
        });
      },
      // 修改密码
      changepassword(index,row){
        const TeacherUsername = row.username
        this.$prompt('请输入新密码', '重置密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if( value.length < 4 ){
          this.$message({
            type: 'error',
            message: '新密码不能小于四位'
          });
          } else {
          const token = this.header
          axios({
            url:'http://localhost:18082/TeacherAccount/changeTeacherAccount',
            method:'post',
            headers:{ Authorization:token.Authorization },
            data:{value,TeacherUsername}
          }).then( (res) => {
            console.log(res);
          }).catch( (err) => {
            console.log(err);
          })
          this.$message({
            type: 'success',
            message: '重置密码成功,新密码是: ' + value
          });
          }
        }).catch((err) => {
          console.log(err);
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      //删除教师账号
      deleteTeacher(index,row){
        const deleteTeacherAccountName  = row.username
        const token = this.header
        this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          axios({
          url:'http://localhost:18082/TeacherAccount/deleteTeacher',
            method:'post',
            headers:{ Authorization:token.Authorization },
            data:{deleteTeacherAccountName}
        }).then((res) => {
          console.log(res);
        }).catch( (err) => {
          console.log(err);
        })}
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
    // 查询数据
    beforeMount() {
      const that = this
      const token = this.header
      // 请求后端数据
      axios.get('http://localhost:18082/TeacherAccount/showTeacherAccount',{
            // 并保存token到请求头中
            headers:{ Authorization:token.Authorization }
        }).then( function (res) {
            //保存到data中
            res.data.data.map( (item) => {
              // 显示数据
              that.$data.tableData.push(item)
            })
      }).catch( err => { console.log(err); })
  },
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