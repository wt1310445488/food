<template>
    <div>
        <h3>产品销售情况</h3>
        <div id="myChart" :style="{width: '100%', height: '800px'}"></div>
    </div>
</template>
<script>
var colorList = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [{
                offset: 0,
                color: 'rgba(51,192,205,0.01)' // 0% 处的颜色
            },
            {
                offset: 1,
                color: 'rgba(51,192,205,0.57)' // 100% 处的颜色
            }
        ],
        globalCoord: false // 缺省为 false
    },
    {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
                offset: 0,
                color: 'rgba(115,172,255,0.02)' // 0% 处的颜色
            },
            {
                offset: 1,
                color: 'rgba(115,172,255,0.67)' // 100% 处的颜色
            }
        ],
        globalCoord: false // 缺省为 false
    },
    {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [{
                offset: 0,
                color: 'rgba(158,135,255,0.02)' // 0% 处的颜色
            },
            {
                offset: 1,
                color: 'rgba(158,135,255,0.57)' // 100% 处的颜色
            }
        ],
        globalCoord: false // 缺省为 false
    },
    {
        type: 'linear',
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [{
                offset: 0,
                color: 'rgba(252,75,75,0.01)' // 0% 处的颜色
            },
            {
                offset: 1,
                color: 'rgba(252,75,75,0.57)' // 100% 处的颜色
            }
        ],
        globalCoord: false // 缺省为 false
    },
    {
        type: 'linear',
        x: 1,
        y: 1,
        x2: 1,
        y2: 0,
        colorStops: [{
                offset: 0,
                color: 'rgba(253,138,106,0.01)' // 0% 处的颜色
            },
            {
                offset: 1,
                color: '#FDB36ac2' // 100% 处的颜色
            }
        ],
        globalCoord: false // 缺省为 false
    },
    {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [{
                offset: 0,
                color: 'rgba(254,206,67,0.12)' // 0% 处的颜色
            },
            {
                offset: 1,
                color: '#FECE4391' // 100% 处的颜色
            }
        ],
        globalCoord: false // 缺省为 false
    }
]
var colorLine = ['#33C0CD', '#73ACFF', '#9E87FF', '#FE6969', '#FDB36A', '#FECE43']

function getRich() {
    let result = {}
    colorLine.forEach((v, i) => {
        result[`hr${i}`] = {
            backgroundColor: colorLine[i],
            borderRadius: 3,
            width: 3,
            height: 3,
            padding: [3, 3, 0, -12]
        }
        result[`a${i}`] = {
            padding: [8, -60, -20, -20],
            color: colorLine[i],
            fontSize: 12
        }
    })
    return result
}
let data = [{
    'name': '水果',
    'value': 25
}, {
    'name': '饼干曲奇',
    'value': 20
}, {
    'name': '坚果炒货',
    'value': 12
},{
    'name': '牛奶饮品',
    'value': 18
}, {
    'name': '面包蛋糕',
    'value': 13
},{
    'name': '薯片膨化',
    'value': 10
},
{
    'name': '糖果巧克力',
    'value':5
},
{
    'name': '肉干鱼干',
    'value': 13
}].sort((a, b) => {
    return b.value - a.value
})
data.forEach((v, i) => {
    v.labelLine = {
        lineStyle: {
            width: 1,
            color: colorLine[i]
        }
    }
})
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.loadecharts();
    },
    methods:{
        loadecharts(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: {
                    text: '产品销售情况',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

            series: [{
                    name:'已售出',
                    type: 'pie',
                    radius: '60%',
                    center: ['50%', '50%'],
                    clockwise: true,
                    avoidLabelOverlap: true,
                    label: {
                        show: true,
                        position: 'outside',
                        formatter: function(params) {
                            const name = params.name
                            const percent = params.percent + '%'
                            const index = params.dataIndex
                            return [`{a${index}|${name}：${percent}}`, `{hr${index}|}`].join('\n')
                        },
                        rich: getRich()
                    },
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                return colorList[params.dataIndex]
                            }
                        }
                    },
                    data,
                    roseType: 'radius'
                }]
            });
                }
            }
        }
</script>
