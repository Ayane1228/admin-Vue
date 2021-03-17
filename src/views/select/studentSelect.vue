<template>
    <div>
        <div class="main">
            <h3>我的选题结果</h3>     
                <div class="selectInformation">
                    <!-- 选题题目 -->
                    <p>
                        <strong>选题题目：</strong>
                        {{resultSelect.title}}
                    </p>
                    <!-- 是否确认 -->
                    <p>
                        <strong>
                            是否已确认：
                        </strong>
                            <el-tag :type="resultSelect.pick=='已确认' ? 'success' : 'danger'" class="tag">
                                {{resultSelect.pick}}
                            </el-tag>
                    </p>
                    <!-- 指导教师 -->
                    <p>
                        <strong>
                            指导教师：
                        </strong>
                        {{resultSelect.teachername}}
                    </p>
                    <br/>
                    <!-- 教师职称 -->
                    <p>
                        <strong>教师职称：</strong>
                        {{resultSelect.teacherrank}}
                    </p>
                    <!-- 所需专业 -->
                    <p>
                        <strong>所需院系：</strong>
                        {{resultSelect.needmajor}}
                    </p>
                    <!-- 教师电话 -->
                    <p>
                        <strong>教师电话：</strong>
                        {{resultSelect.phone}}
                    </p>
                    <!-- 教师邮箱 -->
                    <p>
                        <strong>教师邮箱:</strong>
                        {{resultSelect.email}}
                    </p>
                    <br/>
                    <!-- 选题要求 -->
                    <p>
                        <strong>选题要求</strong>
                        {{resultSelect.content}}
                    </p>
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
    data(){
        return{
            resultSelect:{
                title:'null',
                teachername:'null',
                teacherrank:'null',
                phone:'null',
                email:'null',
                needmajor:'null',
                content:'null',
                pick:'未确认'
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
    beforeMount(){
      const that = this
      const token = this.header
        // 请求后端数据
        axios.get('http://localhost:18082/select/studentSelect',{
            // 并保存token到请求头中
            headers:{
              Authorization:token.Authorization
            }
        }).then( (res) =>{
            // 将后台获得值赋值给data
            const result = this.$data.resultSelect;
            const resSelect = res.data.data;
            result.title = resSelect.title
            result.teachername = resSelect.teachername
            result.teacherrank = resSelect.teacherrank
            result.phone = resSelect.phone
            result.email = resSelect.email
            result.needmajor = resSelect.needmajor
            result.content = resSelect.content
            result.pick = resSelect.pick
        }).catch( (err) => {
          console.log(err);
        })
    }
}
</script>

<style>
.main{
    margin-left: 50px;
    margin-bottom: 10px;
}
.selectInformation{
    margin-left: 50px;
    margin-top: 50px;
}
.selectInformation p{
    display: inline-block;
    margin:0 100px 48px 0 ;
}
</style>
