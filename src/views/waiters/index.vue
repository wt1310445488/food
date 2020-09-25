<template>
<div class="app-container">
  <h3>员工管理</h3>
   <el-button type="primary" size="small" @click="addHandler()">新增</el-button>
   <el-button type="danger" size="small" @click="batchDelete()">批量删除</el-button>
   <el-table
    v-loading="loading"
    :data="list"
    stripe
    style="width: 100%" 
    @selection-change="handleSelectionChange"
    >
    <el-table-column
    align="center"
      type="selection"
      width="55"
      prop="id">
    </el-table-column>
    <el-table-column
    align="center"
      prop="username"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
    align="center"
      prop="telephone"
      label="手机号">
    </el-table-column>
    <el-table-column
    align="center"
      prop="idCard"
      label="身份证号">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template v-slot = "scope">
        <el-button
          size="mini"
          @click="updateHandler(scope.row)"
          >编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteById(scope.row.id)"
          >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!-- 分页 -->
    <template>
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="fetchData" />
    </template>
<!-- 模态框 -->
<el-dialog :title="title" 
 :visible="dialogFormVisible"
 @close="dialogClose()"
>
    <p>用户名: <el-input v-model="waiter_info.username"></el-input>  
    <p>手机号: <el-input v-model="waiter_info.telephone" ></el-input>
    <p>身份证号: <el-input v-model="waiter_info.idCard" ></el-input>
 
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogClose()">取 消</el-button>
    <el-button type="primary" @click="AddHandler(),dialogClose()">确 定</el-button>
  </div>
</el-dialog>
<!-- 分页 -->
<!-- <pagination
    :total="total"
    :page.sync="listQuery.page" 
    :limit.sync="listQuery.limit"
    @pagination="getList" /> --> 
</div>
</template>
<script>
import Pagination from '@/components/Pagination'
import {mapState,mapActions} from 'vuex'
export default {
  components: { Pagination },
  data(){
    return{
    
    }
  },  
  //在仓库中的数据,获取时,必须卸载computed中
  computed:{
    ...mapState('waiters',['list','total','listQuery','dialogFormVisible','waiter_info','multipleSelection','loading','title']),
  },
  created(){
    this.fetchData()
  },
  methods:{
    
    ...mapActions('waiters',['fetchData','addHandler','dialogClose','AddHandler','batchDelete','deleteById','updateHandler','handleSelectionChange'])
   
  }
  
}
</script>