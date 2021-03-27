<template>
  <div>
    <div class="all">
      <h2>选择选题</h2>
      <h5>每个学生可以选择符合自己专业的选题并等待教师确认最终选题结果。</h5>
      <div class="main">
        <el-table
          :ref="allSelect"
          :data="allSelect.slice((currentPage - 1) * pagesize, currentPage*pagesize)"
          style="width: 100%"
        >
          <!-- 展开部分 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="课题名称">
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
          <!-- 选题 -->
          <el-table-column
            prop="title"
            label="选题"
            width="180"
          />
          <!-- 指导教师 -->
          <el-table-column
            prop="teachername"
            label="指导教师"
            width="180"
          />
          <!-- 职称 -->
          <el-table-column
            prop="teacherrank"
            label="教师职称"
            width="180"
          />
          <!-- 专业 -->
          <el-table-column
            prop="needmajor"
            label="专业要求"
            width="180"
          />
          <!-- 是否可选 -->
          <el-table-column
            prop="isTrue"
            width="180"
            label="当前是否可选"
            :filters="[{ text: '可选', value: '可选' }, { text: '不可选', value: '不可选' }]"
            :filter-method="filterIsTrue"
            filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <!-- 三元运算符定义tag的内容 -->
              <el-tag
                :type="scope.row.istrue=='可选' ? 'success' : 'danger'"
              >
                {{ scope.row.istrue }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- 确认选择 -->
          <el-table-column
            prop="submit"
            label="确认选择"
            width="180"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                :disabled="scope.row.istrue== '不可选'"
                @click="submit(scope.row)"
              >确认选择
              </el-button>
            </template>
          </el-table-column>
          <!-- 搜索 -->
          <el-table-column
            align="right"
          >
            <template slot="header" slot-scope="{}">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入教师姓名进行搜索"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="searchInput(search)"
                />
              </el-input>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="pagination">
          <el-pagination
            :current-page="currentPage"
            :page-size="pagesize"
            layout="prev, pager, next"
            :total="100"
            @current-change="handleCurrentChange"
          />
        </div>
        <!-- 查询结果Dialog 组件显示表格数据 -->
        <el-dialog
          title="查询结果"
          width="65%"
          :visible.sync="dialogTableVisible"
          @open="dialogOpen"
        >
          <el-table :data="resultSelect">
            <!-- 展开部分 -->
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item label="课题名称">
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
            <!-- 选题 -->
            <el-table-column
              prop="title"
              label="选题"
              width="150"
            />
            <!-- 指导教师 -->
            <el-table-column
              prop="teachername"
              label="指导教师"
              width="150"
            />
            <!-- 职称 -->
            <el-table-column
              prop="teacherrank"
              label="教师职称"
              width="150"
            />
            <!-- 专业 -->
            <el-table-column
              prop="needmajor"
              label="专业要求"
              width="150"
            />
            <!-- 是否可选 -->
            <el-table-column
              prop="isTrue"
              width="150"
              label="当前是否可选"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.istrue =='可选' ? 'success' : 'danger'"
                >
                  {{ scope.row.istrue }}
                </el-tag>
              </template>
            </el-table-column>
            <!-- 确认选择 -->
            <el-table-column
              prop="submit"
              label="确认选择"
              width="150"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  :disabled="scope.row.istrue == '不可选'"
                  @click="submit(scope.row)"
                >确认选择
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      // 判断是否是学生账号,0为学生账号，1为教师账号或管理员
      isStudent: 0,
      pagesize: 10, // 设置每页显示条目个数为10
      currentPage: 1, // 设置当前页默认为1
      allSelect: [], // 默认显示数据
      dialogTableVisible: false, // 对话框默认关闭
      resultSelect: [], // 对话框表格数据
      search: null, // input查询内容
      showSelectUrl: `${process.env.VUE_APP_BASE_API}/select`
    }
  },
  computed: {
    //  计算属性获取token
    header() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  // 判断是否为学生账号,验证修改前端 istrue的值
  beforeMount() {
    const that = this
    const token = this.header
    axios({
      url: `${this.$data.showSelectUrl}/isStudent`,
      headers: { Authorization: token.Authorization }
    }).then((res) => {
      const role = res.data.data[0].role
      if (role !== 'student') {
        // 设置isStudent为1
        that.isStudent = 1
        setTimeout(function() {
          that.$data.allSelect.forEach((item) => {
            item.istrue = '不可选'
          })
        }, 250)
        that.$message.warning('教师/管理员无法选题')
      } else {
        return
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  // 获取选题信信息
  mounted() {
    const that = this
    const token = this.header
    axios.get(`${this.$data.showSelectUrl}/allSelect`, {
      // 并保存token到请求头中
      headers: { Authorization: token.Authorization }
    }).then(function(res) {
      // 保存到data中
      res.data.data.map((item) => {
        that.$data.allSelect.push(item)
      })
    }).catch(err => { console.log(err) })
  },
  methods: {
    // 学生确认选题
    submit(row) {
      this.$confirm(`注意一个学生一次只选择一个选题，这次将选择选题: ${row.title}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const token = this.header
        axios({
          url: `${this.$data.showSelectUrl}/choiceSelect`,
          method: 'post',
          headers: { Authorization: token.Authorization },
          data: { row }
        }).then((res) => {
          if (res.data === '不能重复选题') {
            this.$message({
              type: 'error',
              message: `${res.data}`
            })
          } else {
            this.$message({
              type: 'success',
              message: `${res.data},请刷新页面`
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message.info('取消选题')
      })
    },
    // 过滤是否可选
    filterIsTrue(value, row) {
      return row.istrue === value
    },
    // 分页器,设置当前页：current-change	currentPage（当前页） 改变时会触发
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    // 查询选题
    searchInput(search) {
      // 重新将数组赋为空
      this.$data.resultSelect = []
      const that = this
      const teacherName = search
      const token = this.header
      axios({
        method: 'post',
        url: `${this.$data.showSelectUrl}/searchSelect`,
        headers: { Authorization: token.Authorization },
        data: { teacherName }
      }).then((res) => {
        if (res.data.msg === '无结果') {
          this.$message.warning('查询不到相关选题，请重新输入教师姓名重试')
        } else {
          res.data.data.map((item) => {
            that.$data.resultSelect.push(item)
          })
          this.$message.success('查询成功')
          that.$data.dialogTableVisible = true
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 开启dialog的回调函数 判断是否是学生账号,0为学生账号，1为教师账号或管理员
    dialogOpen() {
      if (this.$data.isStudent === 0) {
        return
      } else {
        this.$data.resultSelect.map((item) => {
          item.istrue = '不可选'
        })
      }
    }
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
  .all{
    margin-top: 36px;
  }
  .serachInput{
    width: 500px;
  }
  .searchForm{
    margin-top: 15px;
  }
  .serach h2{
    margin-top: 10px;
  }
  .pagination{
    margin-top: 36px;
    text-align: center;
  }
</style>
