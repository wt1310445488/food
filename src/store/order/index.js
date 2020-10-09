import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {get,post} from '../../utils/axios'
import ElementUI from 'element-ui'
const order = {
    namespaced :true,
    state:{
        orderlist:[],//分页查询的数据 
        total:0,//分页查询的总数
        listQuery:{
            page:1,//当前页码
            limit:5,//一页显示几条
        },
        waiters:{},//员工信息
        rowlist:{},//模态框数据
    }, 
    mutations:{
        SETLIST(state,data){
            state.orderlist=data
        },
        SETLISTwaiters(state,data){ 
            state.waiters = data
        },
        SETLISTrowlist(state,data){
            state.rowlist= data
        }
    },
    actions:{
        //分页查询
        loadData(context){
            post("/order/queryPage",{
                page:context.state.listQuery.page-1,
                pageSize:context.state.listQuery.limit,
                status:context.state.listQuery.status,
            }).then((resp)=>{
                // console.log(resp)
                context.state.total=resp.data.total
                context.commit('SETLIST',resp.data.list)
            })
            
        },
        //查询员工信息
        findAllwaiter(context){
            get('/waiter/findAll').then((resp)=>{
                // console.log(resp)
                context.commit('SETLISTwaiters',resp.data)
            })
        },
        //派单
        sendOrder(context,row){
            context.commit('SETLISTrowlist',row)
            console.log(context.state.rowlist)
            get('/order/sendOrder?waiterId= '+context.state.rowlist.waiterId+'&orderId='+context.state.rowlist.id
            ).then((resp)=>{
                console.log(resp)
            })
        }
    }

}
export default order
