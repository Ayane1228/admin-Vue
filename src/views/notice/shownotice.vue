<template>
  <div>
    <div id="main">
    <h3>最新通知</h3>
        <el-table
        :data="list"
        stripe
        fit
        highlight-current-row
        style="width: 100%">
          <!-- 公告日期 -->
          <el-table-column
            prop="noticeTime"
            label="日期"
            width="180">
          </el-table-column>
          <!-- 公共题目 -->
          <el-table-column
            prop="noticeTitle"
            label="题目"
            width="600">
          </el-table-column>
          <!-- 查看详情 -->
          <el-table-column>
            <template slot-scope="scope">
              <el-button 
                type="primary" 
                @click="showContent(scope.$index)">
                查看详情
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
// 导入时间戳转换函数
import utc2beijing from '../../utils/get-noticeTime'
export default {
  // 公告数据
    data() {
      return {
        list: []
      }
    },
    methods:{
      // 查看详情，参数：当前行的index值(和list数组中的index对应)
      showContent(index){
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
    },
    //计算属性获取token
    computed:{
      header(){
        return {
          Authorization:`Bearer ${getToken()}`
        }
      }
    },
    // 获取公告
    beforeMount() {
      const that = this
      const token = this.header
      // 请求后端数据
      axios.get('http://localhost:18082/notice/shownotice',{
            // 并保存token到请求头中
            headers:{
              Authorization:token.Authorization
            }
        }).then( function (res) {
            //保存到data中
            res.data.data.map( (item) => {
              //格式化时间
              item.noticeTime = utc2beijing(item.noticeTime)
              // 显示数据
              that.$data.list.push(item)
            })
      }).catch(err => {
        console.log(err);
      }) 
  }
}
</script>

<style>
#main{
  margin: 30px;
}
.msgBox{
  overflow: scroll; 
  overflow-x:hidden ;
  width: 60%;
  height: 80%;
}
</style>
