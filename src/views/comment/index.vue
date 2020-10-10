<template>
<div class="app-container">
  <h3>评论管理</h3>
   <el-button type="danger" size="small" @click="toBatchDelete()">批量删除</el-button>
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
      prop="orderId"
      label="订单编号"
      width="180">
    </el-table-column>
    <el-table-column
    align="center"
      prop="cusId"
      label="顾客Id">
    </el-table-column>
    <el-table-column
    align="center"
      prop="content"
      label="评论内容">
    </el-table-column>
    <el-table-column
    align="center"
      label="评论时间">
     <template v-slot="slot">{{slot.row.commentTime|dateFormat}}</template>
    </el-table-column>
    <el-table-column
    align="center"
      prop="status"
      label="状态">
    </el-table-column>
    <el-table-column label="操作" align="center" style="width:80px">
      <template v-slot = "scope">
        <el-button
          size="mini"
          type="primary"
          @click="commentExamine(scope.row)"
          >审核通过</el-button>
          <el-button
          size="mini"
          type="info"
         @click="commentRefuseExamine(scope.row)"
          >拒绝通过</el-button>
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
<!-- /分页 -->
<!-- 确认框 -->
<el-dialog
  title="警告"
  :visible="dialogVisible"
  width="30%"
  @close="edialogClose()"
  >
  <span>确认删除么?</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="edialogClose(),ewedialogClose()">取 消</el-button>
    <el-button type="primary" @click="edialogClose(),tobatchDelete()">确 定</el-button>
  </span>
</el-dialog>
<!-- /确认框 -->

</div>
</template>
<script>
import Pagination from '@/components/Pagination'
import {mapState,mapActions} from 'vuex'
export default {
  components: { Pagination },
  data(){
    return{
    dialogVisible:false,//确认框隐藏
    }
  },   
  //在仓库中的数据,获取时,必须卸载computed中
  computed:{
    ...mapState('comment',['list','total','listQuery','loading','multipleSelection']),
  },
  created(){
    this.fetchData()
  },
  methods:{  
   //批量删除前弹出警告框
    toBatchDelete(){
      this.dialogVisible=true
   },
    // 警告框关闭
    edialogClose(){
      this.dialogVisible=false
    },
    //点击警告框的确认按钮批量删除
    tobatchDelete(){
      this.batchDelete()
    },
    //点击取消提示取消删除
    ewedialogClose(){
      this.$notify({
                    title:'取消',
                    message:'批量删除取消',
                    type:'error',
                    duration: 2000,//显示两秒
                })
    },
    ...mapActions('comment',['fetchData','batchDelete','deleteById','handleSelectionChange','commentExamine','commentRefuseExamine']),
  }
  
}
</script>