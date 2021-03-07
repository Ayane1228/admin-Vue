<template>
  <div>
    <h3>提交选题</h3>
      <div class="addContent">
        <el-form label-width="100px" :model="selectForm" :rules="rules" ref="selectForm" class="demo-form-inline" >
        <el-row>
          <el-col :span="10">
            <el-form-item label="题目" prop="newTitle" >
              <el-input v-model="selectForm.newTitle" placeholder="论文题目"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="指导教师" prop="selectForm" >
              <el-input v-model="selectForm.teacherName" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="教师电话" prop="selectForm" >
              <el-input v-model="selectForm.teacherPhone" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="教师邮箱" prop="selectForm" >
              <el-input v-model="selectForm.teacherEmail" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="教师办公室" prop="selectForm" >
              <el-input v-model="selectForm.teacherOffice" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="职称" prop="selectForm" >
              <el-input v-model="selectForm.teacherRank" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所需专业" prop="zhuangye" >
              <el-cascader
              ref="zhuangye"
              placeholder="专业"
              :options="selectForm.options"
              filterable></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="设计相关描述" prop="selectForm" >
              <el-input
                type="textarea"
                :rows="2"
                :autosize="{ minRows: 6}"
                placeholder="请输入内容"
                v-model="selectForm.textarea">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="11">
          <el-form-item>
            <el-button type="primary" @click="addNewSelect()">确认添加</el-button>
          </el-form-item>
        </el-col>
    </el-form>
    </div>    
  </div>
</template>
<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
    data(){
      return{
        selectForm:{
          newTitle:null,
          teacherName:null,
          teacherPhone:null,
          teacherEmail:null,
          teacherOffice:null,
          teacherRank:null,
          textarea:null,               
          options: [{
          value: '信息工程学院',
          label: '信息工程学院',
          children: [{
            value: '信息工程学院/软件工程',
            label: '软件工程'
          }, {
            value: '信息工程学院/软件工程(嵌入式)',
            label: '软件工程(嵌入式)',
          }]
          }, 
          {
          value: '机电工程与自动化学院',
          label: '机电工程与自动化学院',
          children: [{
            value: '机电工程与自动化学院/车辆工程',
            label: '车辆工程',
          }, {
            value: '机电工程学院/自动化',
            label: '自动化',
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
        // 前端验证规则
        rules:{
          newTitle:[ { required: true, message: '请输入选题名称', trigger: 'blur' },
                  { min: 3, message: '长度最少为3个字符', trigger: 'blur' } ]               
        }
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
      // 提交成功
      success() {
        this.$message({
          message: '提交成功',
          type: 'success'
        });
      },
      // 提交失败
      fail(){
          this.$message({
          message: '提交失败',
          type: 'error'
        });
      },
      // 提交新选题
      addNewSelect(selectForm){     
        const newTitle = this.$data.selectForm.newTitle
        const teacherName = this.$data.selectForm.teacherName
        const newContent = this.$data.selectForm.textarea
        this.$refs.selectForm.validate((valid) => {
        const newMajor = this.$refs['zhuangye'].getCheckedNodes()[0].data.value
          if (valid || !newMajor) {
            this.success()
            const token = this.header
            axios({
              url:'http://localhost:18082/select/addSelect',
              method:'post',
              headers:{ Authorization:token.Authorization },
              data:{newTitle,teacherName,newMajor,newContent}
            }).then( (res) => {
              console.log(res);
            }).catch( (err) => {
              console.log(err);
            })
          } else {
            this.fail()
            return false;
          }
        });   
      }
    },
    // 判断账号是否是管理员账号，是则重定向
    beforeMount(){
      const that = this
      const dataForm = that.$data.selectForm
      const token = this.header
            // 请求后端数据
      axios.get('http://localhost:18082/select/showSelect',{
            // 并保存token到请求头中
            headers:{
              Authorization:token.Authorization
            }
        }).then( (res) =>{
          // 判断是否为管理员
          if (res.data == '管理员无权添加选题') {
            // 重定向
            window.location.href = 'http://localhost:9527/index.html#/selcet/errorselect'
          } else {
            let result = res.data.data[0]
            dataForm.teacherName = result.truename
            dataForm.teacherPhone = result.phone
            dataForm.teacherEmail = result.email
            dataForm.teacherOffice = result.office
            dataForm.teacherRank = result.teacherrank
          }
        }).catch( (err) => {
          console.log(err);
        })
    }
}
</script>


<style>
  h3{
    margin-left: 50px;
  }
  .addContent{
    margin-left: 80px;
  }
</style>
