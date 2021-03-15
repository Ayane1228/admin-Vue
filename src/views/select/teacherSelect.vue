<template>
  <div>
    <h2>确认选题结果</h2>
    <h5>教师可以在此确认选题的结果</h5>
    <div class="main">
      <el-table
      ref="topicTable" 
      :row-key="getRowKeys"
      :data="allSelect"
      style="width: 100%">
      <!-- 手风琴效果 -->
          <el-table-column type="expand" width="1">
            <!-- 学生姓名 -->
            <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item label="姓名">
                      <span> {{ props.row.truename }}</span>
                  </el-form-item>
                  <el-form-item label="学号" >
                      <span> {{ props.row.studentID }}</span>
                  </el-form-item>
                  <el-form-item label="班号" >
                      <span> {{ props.row.classID }}</span>
                  </el-form-item>
                  <el-form-item label="专业" >
                      <span> {{ props.row.major }}</span>
                  </el-form-item>          
                  <el-form-item label="联系方式" >
                      <span> {{ props.row.phone }}</span>
                  </el-form-item>              
                  <el-form-item label="邮箱" >
                      <span> {{ props.row.email }}</span>
                  </el-form-item>          
                  <el-form-item label="个人简介" >
                      <span> {{ props.row.introduction }}</span>
                  </el-form-item>                                      
                </el-form>
            </template>
          </el-table-column>
          <!-- 选题 -->
          <el-table-column
            prop="title"
            label="选题"
            width="180">
          </el-table-column>
          <!-- 所需专业 -->
          <el-table-column
            prop="needmajor"
            label="所需专业"
            width="180">
          </el-table-column>
          <!-- 当前选择姓名 -->
          <el-table-column
            prop="truename"
            label="当前选择学生姓名"
            width="180">
          </el-table-column>
          <!-- 查看学生信息 -->
          <el-table-column
            prop="show"
            label="查看学生信息"
            width="180">
            <template slot-scope="scope">
              <el-button 
                  type="primary" 
                  @click="showmore(scope.row)"
                  :disabled="scope.row.truename== null"
                >查看学生信息
              </el-button>
            </template>
          </el-table-column>
          <!-- 确认选择 -->
          <el-table-column
            prop="submit"
            label="确认选择"
            width="180">
            <template slot-scope="scope">
              <el-button 
                  type="primary" 
                  @click="submit(scope.row)" 
                  :disabled="scope.row.truename== null"
                >确认选择
              </el-button>
            </template>
          </el-table-column>
          <!-- 取消选择 -->
          <el-table-column
            prop="cancel"
            label="取消选择"
            width="160">
            <template slot-scope="scope">
              <el-button 
                  type="danger" 
                  :disabled="scope.row.truename== null"
                  @click="cancel(scope.row)" 
                >取消选择
              </el-button>
            </template>
          </el-table-column>
          <!-- 删除选题 -->
          <el-table-column
            prop="delete"
            label="删除该选题"
            width="160">
            <template slot-scope="scope">
              <el-button 
                  type="danger"
                  :disabled="scope.row.truename != null" 
                  @click="deleteselect(scope.row)" 
                >删除选题
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
    // 显示学生详细信息
    showmore(row){
      let $table = this.$refs.topicTable
      $table.toggleRowExpansion(row)
    },
    // 取消选择：拒绝学生
    cancel(row){
        this.$confirm(`此操作将取消当前选择学生：${row.truename}。选中的课题: ${row.title}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = this.header
          console.log(row);
          axios({
            url:'http://localhost:18082/select/cancelStudent',
            method:'post',
            headers:{ Authorization:token.Authorization },
            data:{ row }
          }).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
          this.$message({
            type: 'success',
            message: '取消选择成功,请刷新页面'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消成功'
          });          
        });
    },
    // 确认选择
    submit(row){
        this.$confirm(`将选择当前选择学生：${row.truename}。选中的课题: ${row.title}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = this.header
          console.log(row);
          axios({
            url:'http://localhost:18082/select/pickStudent',
            method:'post',
            headers:{ Authorization:token.Authorization },
            data:{ row }
          }).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
          this.$message({
            type: 'success',
            message: '选中成功,请刷新页面'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消成功'
          });          
        });      
    },
    // 删除选题
    deleteselect(row){
        this.$confirm(`此操作将删除当前选题: ${row.title}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const token = this.header
          console.log(row);
          axios({
            url:'http://localhost:18082/select/deleteSelect',
            method:'post',
            headers:{ Authorization:token.Authorization },
            data:{ row }
          }).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
          this.$message({
            type: 'success',
            message: '删除成功,请刷新页面'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });          
        });
    },

  },

  // 获取当前教师选题信息
  beforeMount(){
      const that = this
      const token = this.header
      axios.get('http://localhost:18082/select/teachersSelect',
        {
          headers:{ Authorization:token.Authorization}
        }
      ).then( (res) => {
            //保存到data中
            res.data.data.map( (item) => {
              // 显示数据
              that.$data.allSelect.push(item)
            })
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
  .el-table__expand-icon{
    visibility: hidden
  }
</style>
