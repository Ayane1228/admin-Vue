<template>
  <div>
    <div id="main">
      <h3>最新通知</h3>
      <!--
        首先是数组的 .slice 方法，用来截取数组，它接受收两个参数，第一个是开始的索引值，第二个是结束的索引值。
        截取的数组的值放在一个新的数组中,但是不包含结束的索引对应的元素值。
        所以，当前页为第一页时 data 数据源为 从第0条到第 pageSize 条，
        而当currentPage或者pageSize发生改变时，data数据源也会跟着变化，
        因此就实现了分页器与表格的连接。 -->
      <el-table
        :data="list.slice((currentPage - 1) * pagesize, currentPage*pagesize)"
        stripe
        fit
        highlight-current-row
        style="width: 100%"
      >
        <!-- 公告日期 -->
        <el-table-column
          prop="noticeTime"
          label="日期"
          width="180"
        />
        <!-- 公共题目 -->
        <el-table-column
          prop="noticeTitle"
          label="题目"
          width="600"
        />
        <!-- 查看详情 -->
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="showContent(scope.$index)"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- size-change	pagesize 改变时会触发	每页条数size，设置page-sizes为数组时能使用这个函数，使得每页显示的个数都不一样 -->
      <!-- current-change	当前页currentPage 改变时会触发	 -->
      <!-- layout，表示需要显示的内容，用逗号分隔，布局元素会依次显示。prev表示上一页，next为下一页，pager表示页码列表,还有jumper（...）表示跳转 -->
      <!-- total表示总条目数（可以用来设置总共的页数：页数 = total / pagesize） -->
      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="100"
          @current-change="handleCurrentChange"
        />
      </div>
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
      noticeUrl: `${process.env.VUE_APP_BASE_API}/notice`,
      pagesize: 10, // 设置每页显示条目个数为10
      currentPage: 1, // 设置当前页默认为1
      list: []
    }
  },
  // 计算属性
  computed: {
    // 获取token
    header() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  // 获取公告
  created() {
    const that = this
    const token = this.header
    // 请求后端数据
    axios.get(`${this.$data.noticeUrl}/shownotice`, {
      // 并保存token到请求头中
      headers: {
        Authorization: token.Authorization
      }
    }).then(function(res) {
      // 保存到data中
      res.data.data.map((item) => {
        // 格式化时间
        item.noticeTime = utc2beijing(item.noticeTime)
        // 显示数据
        that.$data.list.unshift(item)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    // 设置当前页	currentPage（当前页）改变时会触发
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    // 查看详情，参数：当前行的index值(和list数组中的index对应)
    showContent(index) {
      this.$alert(this.$data.list[index].noticeContent, this.$data.list[index].noticeTitle, {
        customClass: 'msgBox',
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: '关闭'
      })
    }
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
.pagination{
  text-align: center;
  margin-top: 36px;
}
</style>
