<template>
  <div>
    <el-table
    :data="tableData"
    style="width: 100%">
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
          <el-form-item label="工号">
            <span>{{ props.row.teahcerID }}</span>
          </el-form-item>
          <el-form-item label="学院">
            <span>{{ props.row.college}}</span>
          </el-form-item>
          <el-form-item label="专业">
            <span>{{ props.row.major}}</span>
          </el-form-item>
          <el-form-item label="联系电话">
            <span>{{ props.row.phone}}</span>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <span>{{ props.row.email}}</span>
          </el-form-item>
        </el-form>
      </template>
      </el-table-column>
      <el-table-column
        label="账号名"
        prop="username">
      </el-table-column>
      <el-table-column
        label="密码"
        prop="password">
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="truename">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [{
          username: 'student',
          password: 'student',
          truename: '王五',
          teahcerID: '2017024132',
          college: '信息工程学院',
          shopId: '10333',
          major:'软件工程',
          phone:'17721576892',
          email:'1127577217@qq.com'
        }]
      }
    }
  }
</script>

<style>
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