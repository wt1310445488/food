<template>
    <div class="app-container">
        <!-- 选项卡 -->
        <el-tabs type="border-card"  v-model="status" @tab-click="toloadData"  >
        <el-tab-pane label="所有订单" name="所有订单" >
            <!-- 表格 -->
            <el-table :data="orderlist">
            <el-table-column prop="id" label="订单编号"></el-table-column>
            <el-table-column width="200" prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="总价"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template v-slot="slot">
                <span v-if="slot.row.status === '待支付'" >待支付</span>  
                <span v-if="slot.row.status === '待接单'" >待接单</span>  
                <span v-if="slot.row.status === '待服务'" >待服务</span>  
                <span v-if="slot.row.status === '待确认'" >待确认</span>  
                <span v-if="slot.row.status === '已完成'" >已完成</span>  
                <el-button type="primary" size="small" v-if="slot.row.status === '待派单'">派单</el-button>
                </template>
            </el-table-column>
            </el-table>
            <!-- /表格 -->
            <!-- 分页 -->
            <template>
                <pagination
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="toloadData"  
                />
            </template>
            <!-- /分页 -->
        </el-tab-pane>
        <el-tab-pane label="待派单" name="待派单">
             <!-- 表格 -->
            <el-table :data="orderlist">
            <el-table-column prop="id" label="订单编号"></el-table-column>
            <el-table-column width="200" prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="总价"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template v-slot="slot">
                <el-button type="primary" size="small" v-if="slot.row.status === '待派单'" @click="toSendOrderHandler(slot.row)">派单</el-button>
                </template>
            </el-table-column>
            </el-table>
            <!-- /表格 -->
            <!-- 分页 -->
            <template>
                <pagination
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="toloadData"  
                />
            </template>
            <!-- /分页 -->
        </el-tab-pane>
        <el-tab-pane label="待支付" name="待支付">
            <!-- 表格 -->
            <el-table :data="orderlist">
            <el-table-column prop="id" label="订单编号"></el-table-column>
            <el-table-column width="200" prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="总价"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            
            </el-table>
            <!-- /表格 -->
            <!-- 分页 -->  
            <template>
                <pagination
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="toloadData"  
                />
            </template>
            <!-- /分页 -->
        </el-tab-pane>
        <el-tab-pane label="待接单" name="待接单">
            <!-- 表格 -->
            <el-table :data="orderlist">
            <el-table-column prop="id" label="订单编号"></el-table-column>
            <el-table-column width="200" prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="总价"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            
            </el-table>
            <!-- /表格 -->
            <!-- 分页 -->  
            <template>
                <pagination
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="toloadData"  
                />
            </template>
            <!-- /分页 -->
        </el-tab-pane>
        <el-tab-pane label="待服务" name="待服务">
             <!-- 表格 -->
            <el-table :data="orderlist">
            <el-table-column prop="id" label="订单编号"></el-table-column>
            <el-table-column width="200" prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="总价"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            </el-table>
            <!-- /表格 -->
            <!-- 分页 -->  
            <template>
                <pagination
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="toloadData"  
                />
            </template>
            <!-- /分页 -->
        </el-tab-pane>
        <el-tab-pane label="待确认" name="待确认">
             <!-- 表格 -->
            <el-table :data="orderlist">
            <el-table-column prop="id" label="订单编号"></el-table-column>
            <el-table-column width="200" prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="总价"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            </el-table>
            <!-- /表格 -->
            <!-- 分页 -->  
            <template>
                <pagination
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="toloadData"  
                />
            </template>
            <!-- /分页 -->
        </el-tab-pane>
        <el-tab-pane label="已完成" name="已完成"> 
             <!-- 表格 -->
            <el-table :data="orderlist">
            <el-table-column prop="id" label="订单编号"></el-table-column>
            <el-table-column width="200" prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="总价"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            </el-table>
            <!-- /表格 -->
            <!-- 分页 -->  
            <template>
                <pagination
                    :total="total"
                    :page.sync="listQuery.page"
                    :limit.sync="listQuery.limit"
                    @pagination="toloadData"  
                />
            </template>
            <!-- /分页 -->
        </el-tab-pane>
        </el-tabs>
        <!-- /选项卡 -->
        <el-dialog
        title="派单"
        style="font-size:30px"
        :visible="visible"
        @close="dialogclose"
        width="35%"
        >
        <div>
            <p> <strong>订单编号：</strong> {{form.id}}         </p>
            <p> <strong>订单总价：</strong> {{form.total}}      </p>
            <p> <strong>下单时间：</strong> {{form.orderTime}}  </p>
            <p> 
            <strong>服务员工：</strong> 
            <el-select v-model="form.waiterId" placeholder="请选择" size="small">
                <el-option
                v-for="e in waiters"
                :key="e.id"
                :label="e.realname" 
                :value="e.id">
                </el-option>
            </el-select>
            </p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small"  @click="dialogclose()">取 消</el-button>
            <el-button size="small" type="primary" @click="tosendOrder()">确 定</el-button>
        </span>
        </el-dialog>
        <!-- /模态框 -->
        
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { mapActions,mapState} from 'vuex'
export default {
    components: { Pagination },//注册分页组件
    data(){
        return{
            status:"所有订单",
            visible:false,
            form:{},
        }
    },
    created(){
       this.toloadData() 
    },
    computed:{
        ...mapState('order',['orderlist','listQuery','total','waiters'])
    },
    methods:{
        toloadData(){
            if (this.status=="所有订单") {
                this.listQuery.status=""
                this.loadData()
            }else{    
                this.listQuery.status=this.status
                this.loadData()   
            }
        },
        // 去派单，将模态框打开，然后选择员工作为派单对象
        toSendOrderHandler(row){
        // 模态框显示当前订单信息
        this.form = row;
        this.visible = true;
        this.findAllwaiter()
        },
        dialogclose(){
            this.visible = false;
        },
        //获取到派单接口需要的waiterId和orderId去拍单
        tosendOrder(){
            console.log(this.form)
            this.sendOrder(this.form)
            this.visible = false;
            this.loadData()
        },

        ...mapActions('order',['loadData','findAllwaiter','sendOrder']),
    },
   
}
</script>