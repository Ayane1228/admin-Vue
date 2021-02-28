<template>
  <div>
    <!-- 添加新学生 -->
    <div class="top">
      <h3>添加新学生账号</h3>
      <div class="topMain">
        <el-form label-width="80px" :model="newStudentForm" :rules="rules" ref="newStudentForm" class="demo-form-inline">
        <el-col :span="5">
          <el-form-item label="账号" prop="newAccount" >
            <el-input v-model="newStudentForm.newAccount" placeholder="账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="密码" prop="newPassword" >
            <el-input v-model="newStudentForm.newPassword" placeholder="密码" show-password></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="姓名"  prop="newName">
            <el-input v-model="newStudentForm.newName" placeholder="姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="学号"  prop="newStudentID">
            <el-input v-model="newStudentForm.newStudentID" placeholder="学号"></el-input>
          </el-form-item>        
        </el-col>
        <el-col :span="5">
          <el-form-item label="班号"  prop="newStudentClassID">
            <el-input v-model="newStudentForm.newStudentClassID" placeholder="班号"></el-input>
          </el-form-item>          
        </el-col>
        <el-col :span="5" class="major">
          <el-form-item label="专业" >
            <el-cascader
            ref="zhuangye"
            placeholder="专业"
            :options="newStudentForm.options"
            filterable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item>
            <el-button type="primary" @click="addNewStudent('newStudentForm')">确认添加</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      </div>    
    </div>
    <!-- 数据展示部分 -->
    <div class="showStudent">
      <h3>学生账号信息</h3>
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
    <el-table-column>
        <template slot-scope="scope">
          <el-button 
              type="danger" 
              @click="deleteStudent(scope.$index, scope.row)">
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
        newStudentForm: {
          newAccount: null,
          newPassword: null,
          newName:null,
          newStudentID:null,
          newStudentClassID:null,  
          //选择专业       
          options: [{
          value: '信息工程学院',
          label: '信息工程学院',
          children: [{
            value: '信息工程学院/软件工程',
            label: '软件工程'
          }, {
            value: '信息工程学院/软件工程(嵌入式)',
            label: '软件工程(嵌入式)',
          }]
          }, 
          {
          value: '机电工程学院',
          label: '机电工程学院',
          children: [{
            value: '机电工程学院/车辆工程',
            label: '车辆工程',
          }, {
            value: '机电工程学院/工业设计',
            label: '工业设计',
          }]
          }, 
          {
          value: '金融学院',
          label: '金融学院',
          children: [{
            value: '金融学院/国际经济与贸易',
            label: '国际经济与贸易'
          }, {
            value: '金融学院/会计学及会计学CIMA',
            label: '会计学及会计学CIMA'
          }]
        }]
        },
        // 验证规则
        rules:{
          newAccount:[{ required: true, message: '请输入账号名', trigger: 'blur' }],
          newPassword:[
            {required: true, message: '请输入密码', trigger: 'blur'},
            { min: 4, message: '密码长度最小为4个字,符', trigger: 'blur' }
          ],
          newName:[{required: true, message: '请输入学生姓名', trigger: 'blur'}],
          newStudentID:[{required: true, message: '请输入学生学号', trigger: 'blur'}],
          newStudentClassID:[{required: true, message: '请输入学生班号', trigger: 'blur'}]

        },
        tableData: []
      }
    },
    methods:{
      // 添加账号
      addNewStudent(newStudentForm) {
        this.$refs[newStudentForm].validate((valid) => {
        // 通过前端验证
        if (valid) {
          this.$message({
          message: '提交成功',
          type: 'success'
        })
        const token = this.header
        const newSAccount = this.$data.newStudentForm.newAccount
        const newSPassword = this.$data.newStudentForm.newPassword
        const newSName = this.$data.newStudentForm.newName
        const newStudentID = this.$data.newStudentForm.newStudentID
        const newStudentClassID = this.$data.newStudentForm.newStudentClassID 
        const newStudentMajor = this.$refs['zhuangye'].getCheckedNodes()[0].data.value
        axios({
            url:'http://localhost:18082/studentAccount/addStudentAccount',
            method:'post',
            headers:{ Authorization:token.Authorization },
            data:{newSAccount,newSPassword,newSName,newStudentID,newStudentClassID,newStudentMajor}
        }).then ( (res) => {
          console.log(res);
        }).catch( (err) => {
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
            url:'http://localhost:18082/studentAccount/changeStudentAccount',
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
      },
      //删除学生账号
      deleteStudent(index,row){
        const deleteStudentAccountName  = row.username
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
          url:'http://localhost:18082/studentAccount/deleteStudent',
            method:'post',
            headers:{ Authorization:token.Authorization },
            data:{deleteStudentAccountName}
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
      axios.get('http://localhost:18082/studentAccount/showStudentAccount',{
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
 .showStudent{
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