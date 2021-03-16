<template>
    <div>
        <div class="main">
            <h3>选题结果</h3>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
                            //     <template slot-scope="scope">
                            // <!-- 三元运算符定义tag的内容 -->
                            // <el-tag :type="scope.row.pick=='已确认' ? 'success' : 'danger'" >{{scope.row.pick}}</el-tag>
                            // </template>
    data(){
        return{
            resultSelect:[{
                title:'',
                teachername:'',
                teacherrank:'',
                phone:'',
                email:'',
                needmajor:'',
                pick:'未确认'
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
    beforeMount(){
    //   const that = this
    //   const token = this.header
    //     // 请求后端数据
    //     axios.get('http://localhost:18082/select/studentSelect',{
    //         // 并保存token到请求头中
    //         headers:{
    //           Authorization:token.Authorization
    //         }
    //     }).then( (res) =>{
    //         console.log(res);
    //     }).catch( (err) => {
    //       console.log(err);
    //     })
    }
}
</script>

<style>
.now{
    margin-left: 50px;
    margin-bottom: 10px;
}
.final{
    margin-left: 50px;
}
</style>
