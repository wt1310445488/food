<template>
  <div class="dashboard-container">
    <div class="patrol_area">
      <div id="allmap" style="height:600px;"></div>
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
	     var map = new BMapGL.Map("allmap");    // 创建Map实例
	    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
    	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
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
</style>
