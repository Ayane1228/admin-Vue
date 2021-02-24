<template>
  <div>

    <!-- 数据展示部分 -->
    <div>
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
          <el-form-item label="学号">
            <span>{{ props.row.studentID }}</span>
          </el-form-item>
          <el-form-item label="班级">
            <span>{{ props.row.classID }}</span>
          </el-form-item>
          <el-form-item label="学院">
            <span>{{ props.row.college}}</span>
          </el-form-item>
          <el-form-item label="专业">
            <span>{{ props.row.major}}</span>
          </el-form-item>
          <el-form-item label="联系电话">
            <span>{{ props.row.phone}}</span>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <span>{{ props.row.email}}</span>
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
            <el-table-column>
          <template slot-scope="scope">
            <el-button 
              type="primary" 
              @click="changepassword(scope.$index, scope.row)">
              修改密码
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
        tableData: []
      }
    },
    methods:{
      changepassword(index,row){
        const studentUsername = row.username
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
            url:'http://localhost:18082/account/changeStudentAccount',
            method:'post',
            headers:{ Authorization:token.Authorization },
            data:{value,studentUsername}
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
      axios.get('http://localhost:18082/account/studentAccount',{
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