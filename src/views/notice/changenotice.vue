<template>
  <div>
    <div class="newNotice">
    <div style="margin: 20px 0;"></div>
    <h3>发布公告</h3>
    <el-input
      type="textarea"
      :autosize="{ minRows: 10, maxRows: 50}"
      placeholder="请输入内容"
      v-model="textareaContent">
    </el-input>
      <el-button 
        type="success"
        @click="submitNotice"
        >
        发布新通知
      </el-button>
    </div>
    <hr>
    <div id="main">
    <h3>最新通知</h3>
    <el-table
    :data="list"
    stripe
    fit
    highlight-current-row
    style="width: 100%">
        <el-table-column
          prop="noticeTime"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="noticeTitle"
          label="题目"
          width="600">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button 
              type="primary" 
              @click="showContent(scope.$index, scope.row)">
              查看详情
            </el-button>
            <el-button type="danger">删除该通知</el-button>
          </template>
        </el-table-column>
    </el-table>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
// 导入时间戳转换函数
import utc2beijing from '../../utils/get-noticeTime'
export default {
    data() {
      return {
        list: [],
        textareaTitle:'',
        textareaContent:''
      }
    },
    methods:{
      // 获取当前列的index和内容
      showContent(index,row){
        this.$alert(this.$data.list[index].noticeContent, this.$data.list[index].noticeTitle, {
        customClass:"msgBox",
        dangerouslyUseHTMLString: true,
        showConfirmButton:false,
        showCancelButton:true,
        cancelButtonText:"关闭"
        }).then( () =>{
          console.log('查看详情');
        }).catch( (err) => {
          console.log(err);
        });
      },
      // 提交新公告
      submitNotice(){
          this.$prompt('请输入标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '发布成功,标题为: ' + value
          });
        }).catch(() => {
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
    beforeMount() {
      const that = this
      const token = this.header
      // 请求后端数据
      axios.get('http://localhost:18082/notice/shownotice',{
            // 并保存token到请求头中
            headers:{
              Authorization:token.Authorization
            }
        })
          .then( function (res) {
            //保存到data中
            res.data.data.map( (item) => {
              //格式化时间
              item.noticeTime = utc2beijing(item.noticeTime)
              // 显示数据
              that.$data.list.push(item)
            })
      }).catch( err => { console.log(err); })
  },
}
</script>

<style>
#main{
  margin:30px;
}
.msgBox{
  overflow: scroll; 
  overflow-x:hidden ;
  width: 60%;
  height: 80%;
}
.newNotice{
  margin: 30px;
}
.newNotice button{
  margin-top: 10px;
}
</style>
