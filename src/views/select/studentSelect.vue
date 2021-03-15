<template>
    <div>
        <!-- 0当前选中的选题：nowSelect -->
        <div class="now">
            <h3>当前选中的选题</h3>
                <el-table
                    :data="nowSelect"
                    style="width: 100%">
                        <!-- 展开部分 -->
                        <el-table-column type="expand">
                            <template slot-scope="props">
                            <el-form label-position="left"  class="demo-table-expand">
                                <el-form-item label="课题名称" >
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
                        <el-table-column
                            prop="title"
                            label="选题"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="teachername"
                            label="指导教师"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="teacherrank"
                            label="教师职称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="needmajor"
                            label="专业要求"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="selectResult"
                            width="180"
                            label="当前结果">
                            <el-tag :type="success" >未确定</el-tag>
                        </el-table-column>
                </el-table>
        </div>
        <!-- 最终选中的选题:finalSelect -->
        <div class="final">
            <h3>最终选题</h3>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
    data(){
        return{
            nowSelect:[],
            finalSelect:[]
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
