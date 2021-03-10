<template>
  <div>
    <h2>确认选题结果</h2>
    <h5>教师可以在此确认选题的结果</h5>
    <div class="main">
      <el-table
      :data="allSelect"
      style="width: 100%">
          <el-table-column
            prop="title"
            label="选题"
            width="180">
          </el-table-column>
          <el-table-column
            prop="needMajor"
            label="所需专业"
            width="180">
          </el-table-column>
          <el-table-column
            prop="studentName"
            label="当前选择学生姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="submit"
            label="查看学生信息"
            width="180">
            <template slot-scope="scope">
              <el-button 
                  type="primary" 
                  @click="submit(scope.row)" 
                >查看学生信息
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="submit"
            label="确认选择"
            width="180">
            <template slot-scope="scope">
              <el-button 
                  type="primary" 
                  @click="submit(scope.row)" 
                >确认选择该学生
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
  data(){
    return {
      allSelect:[]
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
  methods:{
  //   // 选题
  //   submit(row) {
  //     this.$message.success('选择成功,请刷新页面')
  //     const token = this.header
  //     axios({
  //       // url:'http://localhost:18082/select/choiceSelect',
  //       method:'post',
  //       headers:{ Authorization:token.Authorization },
  //       data:{ row }
  //     }).then( (res) => {
  //       console.log(res);
  //     }).catch( (err) => {
  //       console.log(err);
  //     })
  //   }
  },

  // 获取选题信息
  beforeMount(){
      const that = this
      const token = this.header
      axios.get('http://localhost:18082/select/teachersSelect',{
            // 并保存token到请求头中
            headers:{
              Authorization:token.Authorization
            }
        })
          .then( function (res) {
            console.log(res);
      }).catch( err => { console.log(err); })
  }
}
</script>

<style>
  h2{
    margin-left: 50px;
  }
  h5{
    margin-left: 50px;
  }
  .main{
    margin-left: 50px;
  }
</style>
