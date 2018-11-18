$(function(){
  
var echarts_left = echarts.init(document.querySelector('.echarts_left'));

var option1 = {
    title: {
        text: '2018年注册人数'
    },
    tooltip: {},
    legend: {
        data:['人数','销量']
    },
    xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [
      {
        name: '人数',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      },
      {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
      }
  ]
};

echarts_left.setOption(option1);





  var echarts_right = echarts.init(document.querySelector('.echarts_right'));

  var option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年11月',
        x:'center',
        textStyle:{
          color:"#e92322",
          fontSize:30
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Nike','adidas','彪马','阿甘鞋','李宁','安踏']
    },
    series : [
        {
            name: '品牌销量',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'Nike'},
                {value:310, name:'adidas'},
                {value:234, name:'彪马'},
                {value:135, name:'阿甘鞋'},
                {value:800, name:'李宁'},
                {value:600, name:'安踏'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'yellow'
                }
            }
        }
    ]
};

  
  echarts_right.setOption(option2);

})