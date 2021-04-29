<template>
  <div>
    <!-- 添加新学生 -->
    <div class="top">
      <h3>添加新学生账号</h3>
      <!-- 新账号部分 -->
      <div class="topMain">
        <el-form
          ref="newStudentForm"
          label-width="80px"
          :model="newStudentForm"
          :rules="rules"
          class="demo-form-inline"
        >
          <!-- 账号 -->
          <el-col :span="5">
            <el-form-item label="账号" prop="newAccount">
              <el-input v-model="newStudentForm.newAccount" placeholder="账号" />
            </el-form-item>
          </el-col>
          <!-- 密码 -->
          <el-col :span="5">
            <el-form-item label="密码" prop="newPassword">
              <el-input v-model="newStudentForm.newPassword" placeholder="密码" show-password />
            </el-form-item>
          </el-col>
          <!-- 姓名 -->
          <el-col :span="5">
            <el-form-item label="姓名" prop="newName">
              <el-input v-model="newStudentForm.newName" placeholder="姓名" />
            </el-form-item>
          </el-col>
          <!-- 学号 -->
          <el-col :span="5">
            <el-form-item label="学号" prop="newStudentID">
              <el-input
                  type="number"
                v-model.number="newStudentForm.newStudentID"
                placeholder="学号"
              />
            </el-form-item>
          </el-col>
          <!-- 班号 -->
          <el-col :span="5">
            <el-form-item label="班号" prop="newStudentClassID">
              <el-input
                type="number"
                v-model.number="newStudentForm.newStudentClassID"
                placeholder="班号"
              />
            </el-form-item>
          </el-col>
          <!-- 专业 -->
          <el-col :span="5" class="major">
            <el-form-item label="专业" prop="major">
              <el-cascader
                ref="zhuangye"
                v-model="options"
                :options="newStudentForm.options"
                placeholder="专业"
                :props="props"
                expand-trigger="hover"
                filterable
                clearable
              />
            </el-form-item>
          </el-col>
          <!-- 添加按钮 -->
          <el-col :span="11">
            <el-form-item>
              <el-button
                type="primary"
                @click="addNewStudent('newStudentForm')"
              >
                确认添加
              </el-button>
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
        style="width: 100%"
      >
        <!-- 手风琴部分 -->
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
                <span>{{ props.row.college }}</span>
              </el-form-item>
              <el-form-item label="专业">
                <span>{{ props.row.major }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 主体部分 -->
        <!-- 账号 -->
        <el-table-column
          label="账号名"
          prop="username"
        />
        <!-- 密码 -->
        <el-table-column
          label="密码"
          prop="password"
        />
        <!-- 姓名 -->
        <el-table-column
          label="学生姓名"
          prop="truename"
        />
        <!-- 学号 -->
        <el-table-column
          label="学号"
          prop="studentID"
        />
        <!-- 班号 -->
        <el-table-column
          label="班号"
          prop="classID"
        />
        <!-- 学院 -->
        <el-table-column
          label="学院"
          prop="college"
        />
        <!-- 专业  -->
        <el-table-column
          label="专业"
          prop="major"
        />
        <!-- 按钮：修改密码，删除账号 -->
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="changepassword(scope.$index, scope.row)"
            >
              修改密码
            </el-button>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              type="danger"
              @click="deleteStudent(scope.$index, scope.row)"
            >
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
    // 自定义规则-账号
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback()
      }
      if (value) {
        setTimeout(() => {
          var reg = /^[0-9a-zA-Z_]{1,}$/
          if (!reg.test(value)) {
            callback(new Error('请输入数字、字母、下划线'))
          } else {
            callback()
          }
        }, 50)
      }
    }
    // 自定义规则-密码
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback()
      } if (value) {
        setTimeout(() => {
          var reg = /^[0-9a-zA-Z]{1,}$/
          if (!reg.test(value)) {
            callback(new Error('请输入四位以上的数字或字母'))
          } else {
            callback()
          }
        }, 50)
      }
    }
    return {
      // 新学生数据，默认均为空
      newStudentForm: {
        newAccount: null,
        newPassword: null,
        newName: null,
        newStudentID: null,
        newStudentClassID: null,
        // 专业选项
        options: [{
          value: '信息工程学院',
          label: '信息工程学院',
          children: [{
            value: '信息工程学院/软件工程',
            label: '软件工程'
          }, {
            value: '信息工程学院/软件工程(嵌入式)',
            label: '软件工程(嵌入式)'
          }]
        },
        {
          value: '机电工程与自动化学院',
          label: '机电工程与自动化学院',
          children: [{
            value: '机电工程与自动化学院/车辆工程',
            label: '车辆工程'
          }, {
            value: '机电工程学院/自动化',
            label: '自动化'
          }]
        },
        {
          value: '国际商学院',
          label: '国际商学院',
          children: [{
            value: '国际商学院/国际经济与贸易',
            label: '国际经济与贸易'
          }, {
            value: '国际商学院/会计学CIMA',
            label: '会计学CIMA'
          }]
        }]
      },
      // 验证规则
      rules: {
        newAccount: [{ required: true, message: '请输入账号名', trigger: 'blur' },
          { validator: checkAccount, trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, message: '密码长度最小为4个字符', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }],
        newName: [{ required: true, message: '请输入学生姓名', trigger: 'blur' }],
        newStudentID: [{ required: true, message: '请输入学生学号', trigger: 'blur' },
          { type: 'number', message: '学号必须为数字' }],
        newStudentClassID: [{ required: true, message: '请输入学生班号', trigger: 'blur' },
          { type: 'number', message: '班号必须为数字' }]
      },
      // 下方数据
      tableData: [],
      studentAccountURl: `${process.env.VUE_APP_BASE_API}/studentAccount`
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
  // 查询数据
  created() {
    const that = this
    const token = this.header
    console.log(this.$data.studentAccountURl)
    // 请求后端数据
    axios.get(`${this.$data.studentAccountURl}/showStudentAccount`, {
      // 并保存token到请求头中
      headers: { Authorization: token.Authorization }
    }).then(function(res) {
      // 保存到data中
      res.data.data.map((item) => {
        // 显示数据
        that.$data.tableData.push(item)
      })
    }).catch(err => { console.log(err) })
  },
  methods: {
    // 添加账号
    addNewStudent(newStudentForm) {
      // 再次验证
      this.$refs[newStudentForm].validate((valid) => {
        // 通过前端验证
        if (valid) {
          const token = this.header
          const newSAccount = this.$data.newStudentForm.newAccount
          const newSPassword = this.$data.newStudentForm.newPassword
          const newSName = this.$data.newStudentForm.newName
          const newStudentID = this.$data.newStudentForm.newStudentID
          const newStudentClassID = this.$data.newStudentForm.newStudentClassID
          const newStudentMajor = this.$refs['zhuangye'].getCheckedNodes()[0].data.value
          axios({
            url: `${this.$data.studentAccountURl}/addStudentAccount`,
            method: 'post',
            headers: { Authorization: token.Authorization },
            data: { newSAccount, newSPassword, newSName, newStudentID, newStudentClassID, newStudentMajor }
          }).then((res) => {
          // 检查用户名是否重复
            if (res.data.msg == '账号名已存在,请重新尝试') {
              this.$message.error(`${res.data.msg}`)
            } else {
              this.$message.success('新增账号成功，请刷新页面')
            }
          }).catch((err) => {
            console.log(err)
          })
        }
        // 不符合rules
        else {
          this.$message.error('提交失败')
          return false
        }
      })
    },
    // 修改密码
    changepassword(index, row) {
      const studentUsername = row.username
      this.$prompt('请输入新密码', '重置密码', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        if (value.length < 4) {
          this.$message.error('新密码必须大于四位')
        } else {
          const token = this.header
          axios({
            url: `${this.$data.studentAccountURl}/changeStudentAccount`,
            method: 'post',
            headers: { Authorization: token.Authorization },
            data: { value, studentUsername }
          }).then((res) => {
            this.$message.success(res.data.msg)
          }).catch((err) => {
            this.$message.error(err.msg)
          })
        }
      }).catch((err) => {
        this.$message.info('取消输入')
      })
    },
    // 删除学生账号
    deleteStudent(index, row) {
      const deleteStudentAccountName = row.username
      const token = this.header
      this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          url: `${this.$data.studentAccountURl}/deleteStudent`,
          method: 'post',
          headers: { Authorization: token.Authorization },
          data: { deleteStudentAccountName }
        }).then((res) => {
          // 验证是否有选题结果
          if (res.data.msg == '删除成功') {
            this.$message.success('删除成功!请刷新页面')
          } else {
            this.$message.error('该生已存在选题结果，禁止删除账号！')
          }
        }).catch((err) => {
          console.log(err)
        })
      }
      ).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
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
