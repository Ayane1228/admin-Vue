<template>
  <div>
    <h2>选择选题</h2>
    <h5>每人最多可选择三个符合自己专业的选题并等待教师确认最终选题结果。</h5>
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
                  <span>{{ props.row.major }}</span>
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
            prop="major"
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
                  :disabled="scope.row.istrue== '不可选' "
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
    submit(row){
      // 获取当前的token
      const token = this.header
      axios({
        url:'http://localhost:18082/select/ifstudendtaccount',
        method:'post',              
        headers:{ Authorization:token.Authorization },
        data:{ row }
      }).then( (res) => {
        console.log(res.data);
        if ( res.data == 0 ){
            this.$message({
              type: 'error',
              message: `非学生账号无法选择选题`
            })
        } else {
            // 成功提示
              this.$message({
                type: 'success',
                message: `选择成功`
              });
        }
      }).catch( (err) => {
        this.open()
        console.log(err);
      })
      
    }
  },
  beforeMount(){
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
