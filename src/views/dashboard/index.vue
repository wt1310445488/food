<template>
  <div class="dashboard-container">
    <div class="patrol_area">
     
      <div id="allmap" style="height:600px;"></div>  
       <div id="r-result">请输入地址：<input type="text" id="suggestId" size="18" value="查询地址" style="width:60% ; height:30px" /></div>
    	<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data(){
    return{
      
    }
  },
  computed: {  

  },
  mounted(){
    this.createMpa()
  },
  methods:{
    createMpa(){
         // GL版命名空间为BMapGL
        // 按住鼠标右键，修改倾斜角和角度
      function G(id) {
        return document.getElementById(id);
      }
	    var map = new BMapGL.Map("allmap");    // 创建Map实例
	    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      var ac = new BMapGL.Autocomplete(    //建立一个自动完成的对象
        {"input" : "suggestId"
        ,"location" : map
      });
      ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
          var _value = e.fromitem.value;
          var value = "";
          if (e.fromitem.index > -1) {
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
          }    
          str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
          
          value = "";
          if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
          }    
          str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
          G("searchResultPanel").innerHTML = str;
        });

        var myValue;
        ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
          myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
          G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
          
          setPlace();
        });

        function setPlace(){
          map.clearOverlays();    //清除地图上所有覆盖物
          function myFun(){
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMapGL.Marker(pp));    //添加标注
          }
          var local = new BMapGL.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
          });
          local.search(myValue);
        }
     }
     
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
#r-result{width:100%; margin-top:20px ;  width: 100%;}
</style>
