<template>
  <div>
    <h2>选择选题</h2>
    <h5>每个学生可以选择符合自己专业的选题并等待教师确认最终选题结果。</h5>
    <div class="main">
      <el-table
      :data="allSelect"
      style="width: 100%">
          <!-- 展开部分 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left"  class="demo-table-expand">
                <el-form-item label="课题名称" >
                  <span>{{ props.row.title }}</span>
                </el-form-item>
                <el-form-item label="指导教师">
                  <span>{{ props.row.teachername }}</span>
                </el-form-item>
                <el-form-item label="教师职称">
                  <span>{{ props.row.teacherrank }}</span>
                </el-form-item>
                <el-form-item label="教师联系方式">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
                <el-form-item label="教师邮箱">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="所需专业">
                  <span>{{ props.row.needmajor }}</span>
                </el-form-item>
                <el-form-item label="课题描述">
                  <span>{{ props.row.content }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="选题"
            width="180">
          </el-table-column>
          <el-table-column
            prop="teachername"
            label="指导教师"
            width="180">
          </el-table-column>
          <el-table-column
            prop="teacherrank"
            label="教师职称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="needmajor"
            label="专业要求"
            width="180">
          </el-table-column>
          <el-table-column
            prop="isTrue"
            width="180"
            label="当前是否可选">
            <template slot-scope="scope">
            <!-- 三元运算符定义tag的内容 -->
            <el-tag :type="scope.row.istrue=='可选' ? 'success' : 'danger'" >{{scope.row.istrue}}</el-tag>
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
                  :disabled="scope.row.istrue== '不可选'"
                >确认选择
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
    // 学生确认选题
    submit(row) {
          this.$confirm(`注意一个学生一次只选择一个选题，这次将选择选题: ${row.title}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = this.header
          axios({
            url:'http://localhost:18082/select/choiceSelect',
            method:'post',
            headers:{ Authorization:token.Authorization },
            data:{ row }
          }).then((res) => {
            if(res.data == '不能重复选题' ){
              this.$message({
                type:'error',
                message:`${res.data}`
              })
            } else {
              this.$message({
              type: 'success',
              message:`${res.data},请刷新页面`
            });
            } 
          }).catch((err) => {
            console.log(err);
          })
        }).catch(() => {
          this.$message.info('取消选题')       
        })
      }
  },

  // 获取选题信信息
  mounted(){
      const that = this
      const token = this.header
      axios.get('http://localhost:18082/select/allSelect',{
            // 并保存token到请求头中
            headers:{
              Authorization:token.Authorization
            }
        })
          .then( function (res) {
            //保存到data中
            res.data.data.map( (item) => {
              // 显示数据
              that.$data.allSelect.push(item)
            })
      }).catch( err => { console.log(err); })
  },

  // 判断是否为学生账号,验证修改前端 istrue的值
  beforeMount(){
      const that = this
      const token = this.header
      axios({
        url:'http://localhost:18082/select/isStudent',
        headers:{ Authorization:token.Authorization }
      }).then( (res) => {
        const role = res.data.data[0].role
        if( role != 'student') {
          setTimeout(function(){
            that.$data.allSelect.forEach((item,index,arr) => {
            item.istrue = '不可选'
          })
          },250)
        } else{
          console.log('学生账号，可以选择');
        }
      }).catch( (err) => {
        console.log(err);
      })
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
