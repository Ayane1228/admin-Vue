<template>
  <div>
    <div class="newNotice">
      <div style="margin: 20px 0;" />
      <h3>发布公告</h3>
      <!-- 新公告内容框 -->
      <el-input
        v-model="textareaContent"
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 50}"
        placeholder="请输入内容"
      />
      <!-- 发布按钮 -->
      <el-button
        type="success"
        @click="submitNotice"
      >
        发布新公告
      </el-button>
    </div>
    <hr>
    <!-- 通知展示 -->
    <div id="main">
      <h3>最新公告</h3>
      <el-table
        :data="list"
        stripe
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="noticeTime"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="noticeTitle"
          label="题目"
          width="600"
        />
        <!-- 查看详情，删除公告 -->
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="showContent(scope.$index, scope.row)"
            >
              查看详情
            </el-button>
            <el-button
              type="danger"
              @click="deleteNotice(scope.$index, scope.row)"
            >
              删除公告
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
// 导入时间戳转换为标准时间函数
import utc2beijing from '../../utils/get-noticeTime'

export default {
  data() {
    return {
      noticeUrl: `${process.env.VUE_APP_BASE_API}/notice`,
      list: [],
      textareaContent: null
    }
  },
  // 计算属性获取token
  computed: {
    header() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
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
        that.$data.list.push(item)
      })
    }).catch(err => { console.log(err) })
  },
  methods: {
    // 展示详情
    showContent(index) {
      this.$alert(this.$data.list[index].noticeContent, this.$data.list[index].noticeTitle, {
        customClass: 'msgBox',
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: '关闭'
      })
    },
    // 提交公告
    submitNotice() {
      // 判断内容是否为空
      if (this.$data.textareaContent === null || this.$data.textareaContent.length === 0) {
        this.$message.warning('内容不能为空')
      } else {
        this.$prompt('请输入标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if ( value === null || value.length ===0 ) {
              this.$notify.error({
              title: '错误',
              message: '公告标题不能为空'
            });
          } else {
            // 获取当前的token
            const token = this.header
            axios({
              url: `${this.$data.noticeUrl}/changenotice`,
              method: 'post',
              headers: { Authorization: token.Authorization },
              data: { noticeTitle: value, noticeContent: this.$data.textareaContent }
            }).then((res) => {
              if (res.data.msg == '发布成功') {
                this.$message.success('发布成功,标题为: ' + value + ',请刷新页面')
              } else {
                this.$message.error('发布成功失败，请检查接口')
              }
            }).catch((err) => {
              console.log(err)
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '发布失败'
              })
            })
          }
        })
      }
    },
    // 删除公告
    deleteNotice(index, row) {
      const deleteNotice = row.noticeTitle
      this.$alert(`是否要删除公告:${row.noticeTitle}`, '删除公告', {
        confirmButtonText: '确定删除'
      }).then(() => {
        // 获取当前的token
        const token = this.header
        axios({
          url: `${this.$data.noticeUrl}/deleteNotice`,
          method: 'post',
          headers: { Authorization: token.Authorization },
          data: { deleteNotice }
        }).then((res) => {
          this.$message.success(res.data.msg)
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
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
