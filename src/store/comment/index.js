import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {get,post} from '../../utils/axios'
import ElementUI from 'element-ui'
const comment = { 
    namespaced:true,
    state:{ 
            total: 0,//总数量
            listQuery: {
              page: 1,//当前页码 
              limit: 5//一页显示几条
            },
            list:[],
            loading:true,//加载圈
            multipleSelection:[],//存放批量删除的id数组
    },
    mutations:{
        SETLIST(state,data){
            state.list = data
        },
    },
    actions:{
        fetchData(context){
            context.state.loading=true
            post("/comment/query",{
                //因为sql的limit从0开始获取页码
                page:context.state.listQuery.page-1,
                pageSize:context.state.listQuery.limit,
            }).then((resp)=>{
                // console.log(resp)
                // context.state.list = resp.data
                context.state.total = resp.data.total
                context.commit('SETLIST',resp.data.list);
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
                context.state.loading=false
            })
           
        },
       
        deleteById(context,id){ 
            console.log(id)
            get('/comment/deleteById?id='+id).then((resp)=>{
                context.dispatch('fetchData')
                ElementUI.Notification({
                    title: '成功',
                    message: '删除成功',
                    type: 'success', //成功的样式
                    duration: 2000//显示两秒
                });
            }).catch((err)=>{
                ElementUI.Notification.error({
                    title:'失败',
                    message:'操作失败',
                    duration: 2000//显示两秒
                })
            })
        },
        //多选框选中时会调用这个方法
        handleSelectionChange(context,val){
            console.log(val)//选中时会获得所有选中的数据
            context.state.multipleSelection=[],
            //遍历选中的数据将id放入数组中
            val.forEach(function(item){
                context.state.multipleSelection.push(item.id)
            })
            
        },
        //批量删除
        batchDelete(context){
            // console.log(context.state.multipleSelection)
            if(context.state.multipleSelection.length!==0){
                post('/waiter/batchDelete',{ids:context.state.multipleSelection.toString()}).then((resp)=>{
                    ElementUI.Notification({
                    title:'成功',
                    message:'批量删除成功',
                    type:'success',
                    duration: 2000,//显示两秒
                })
                context.dispatch('fetchData')   
            }).catch((err)=>{
                console.log(err)
            })
            }   
        },
        //审核通过
        commentExamine(context,row){
            console.log(row)
            //判断当前状态是不是通过
            if(row.status!=="审核通过"){
                get('/comment/commentExamine?commentid='+row.id).then((resp)=>{
                    ElementUI.Notification({
                        title:'成功',
                        message:'审核成功',
                        type:'success',
                        duration: 2000,//显示两秒
                    })
                    context.dispatch('fetchData')
                })
            }else{
                ElementUI.Notification({
                    title:'警告',
                    message:'这条评论已经审核通过',
                    type:'warning',
                    duration: 2000,//显示两秒
                })
            }
          
        },
        //审核不通过
        
        commentRefuseExamine(context,row){
            console.log(row)
            if(row.status!=="审核不通过"){
                get('/comment/commentRefuseExamine?commentid='+row.id).then((resp)=>{
                    ElementUI.Notification({
                        title:'成功',
                        message:'审核成功',
                        type:'success',
                        duration: 2000,//显示两秒
                    })
                    context.dispatch('fetchData')
                })
            }else{
                ElementUI.Notification({
                    title:'警告',
                    message:'这条评论已经审核不通过',
                    type:'warning',
                    duration: 2000,//显示两秒
                })
            }
        },
    }
    
}
export default comment