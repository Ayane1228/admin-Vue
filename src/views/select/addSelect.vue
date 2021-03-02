<template>
  <div>
    <h3>提交选题</h3>
      <div class="addContent">
        <el-form label-width="100px" :model="selectForm" :rules="rules" ref="selectForm" class="demo-form-inline">
        <el-row>
          <el-col :span="10">
            <el-form-item label="题目" prop="selectForm" >
              <el-input v-model="selectForm.newTitle" placeholder="论文题目"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="指导教师" prop="selectForm" >
              <el-input v-model="selectForm.teacherName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="教师电话" prop="selectForm" >
              <el-input v-model="selectForm.teacherPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="教师邮箱" prop="selectForm" >
              <el-input v-model="selectForm.teacherEmail"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="教师办公室" prop="selectForm" >
              <el-input v-model="selectForm.teacherOffice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="职称" prop="selectForm" >
              <el-input v-model="selectForm.teacherRank"></el-input>
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
            <el-button type="primary" @click="addNewTeacher('selectForm')">确认添加</el-button>
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
          textarea:'123',
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

    },
    beforeMount:{
      // select/errSelect
      // 判断是否为管理员
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
