<template>
  <div class="mian">
    <h3>教师个人信息</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-col :span="5">
        <el-input 
          v-model="form.truename"  
          :disabled="true" ></el-input>
          </el-col>
      </el-form-item>
      
      <el-form-item label="职工号">
        <el-col :span="5">
        <el-input v-model="form.teacherID"  :disabled="true"></el-input>
        </el-col>
      </el-form-item>
      
      
      <el-form-item label="联系电话">
          <el-col :span="5">
            <el-input v-model="form.phone"></el-input>
          </el-col>
      </el-form-item>
      
      <el-form-item label="电子邮箱">
        <el-col :span="5">
          <el-input v-model="form.emial"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="办公室">
        <el-col :span="5">
          <el-input v-model="form.office"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="选题信息">
        <el-col :span="5">
        <el-select v-model="value" placeholder="选题题目">
          <el-option
              v-for="item in form.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" circle class="showMore"></el-button>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'

export default {
      data() {
      return {
        form: {
          truename:null,
          teacherID:null,
          phone:null,
          email:null,
          office:'4N416',
          options: [{
          value: '选项1',
          label: '黄金糕'
        }],
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
    beforeMount() {
      const that = this
      const token = this.header
      console.log(token);
      // 请求后端数据
      // axios.get('http://localhost:18082/information/teacherinformation',{
      //       // 并保存token到请求头中
      //       headers:{
      //         Authorization:token.Authorization
      //       }
      //   })
      //     .then( function (res) {
      //       //保存到data中
      //       res.data.data.map( (item) => {
      //         // 显示数据
      //         that.$data.list.push(item)
      //       })
      // }).catch( err => { console.log(err); })
  },
}
</script>
<style>
  h3{
    margin-left: 20px;
  }
  .mian{
    padding-left: 50px;
  }
  .showMore{
    margin-left: 10px;
  }
</style>
