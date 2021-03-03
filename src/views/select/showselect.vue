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
                  <span>{{ props.row.teacherName }}</span>
                </el-form-item>
                <el-form-item label="教师职称">
                  <span>{{ props.row.teacherRank }}</span>
                </el-form-item>
                <el-form-item label="教师联系方式">
                  <span>{{ props.row.teacherPhone }}</span>
                </el-form-item>
                <el-form-item label="教师邮箱">
                  <span>{{ props.row.teacherEmail }}</span>
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
            prop="teacherName"
            label="指导教师"
            width="180">
          </el-table-column>
          <el-table-column
            prop="teacherRank"
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
            <el-tag :type="scope.row.isTrue=='可选' ? 'success' : 'danger'" >{{scope.row.isTrue}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="submit"
            label="确认选择"
            width="180">
            <el-button type="primary" @click="submit">确认选择</el-button>
          </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      allSelect:[{
          title:'测试标题',
          teacherName:'张三',
          teacherPhone:'17721576892',
          teacherEmail:'suntaiwensss@qq.com',
          teacherRank:'教授',
          major:'软件工程',
          content:` 本系统有三个基本模块即教师信息管理、学生信息管理、管理员信息管理。
                    教师信息管理：包括教师基本信息、课题名称、课题类型、课题要求、课题限报人数、课题简介等。
                    学生信息管理：查看课题信息、选题、多选、退选等。
                    管理员信息管理：发布信息、用户管理、后台管理等。`,
          isTrue:'可选'
      }]
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
    submit(){
      this.$message.success('选择成功');
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
  },
  mounted(){}
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
