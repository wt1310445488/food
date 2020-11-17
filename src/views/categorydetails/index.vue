<template>
    <div class="app-container">
        <h3>栏目详情</h3>      
        <el-row>
            <el-col style="display:inline-block;width:50%">
                <!-- 按钮组 -->
                <el-button type="primary" size="small" @click="tocategory() ">返回</el-button>
                <!-- /按钮组 -->
            </el-col>  
        </el-row>
    
    <!-- 表格 -->
     <el-table    
        :data="row" 
        style="width: 100%" 
        >   

        <el-table-column
          align="center"
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="栏目名称"
          width="180">
        </el-table-column>
        
        <el-table-column
          align="center"
          prop="icon"
          label="栏目图片"
          width="180">  
        </el-table-column>   
     </el-table>
    <!-- /表格 -->
    </div>    
</template>
<script>
export default {
    data(){
        return{
           row:[this.$route.params.row],
        }
    },
 
    computed:{
       
    },
    methods:{
        tocategory(){
            this.$router.go(-1)
        }
    }
}
</script>

