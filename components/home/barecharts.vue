<template>
	<view style="width: 100%; height:500upx"><l-echart ref="chart"></l-echart></view>
</template>
<script>
import * as echarts from '@/uni_modules/lime-echart/components/l-echart/echarts.js';
export default {
	name: 'barecharts',
	props: ['dataList'],
	components: {},
	data() {
		return {
			option: {},
			data:[]
		};
	},
	watch:{
		 dataList: {
		    handler(newName, oldName) {
		      this.data = newName
			  this.getEcharts();
			  this.$refs.chart.init(config => {
			  	const { canvas } = config;
			  	const chart = echarts.init(canvas, null, config);
			  	chart.setOption(this.option);
			  	return chart;
			  });
		    },
		    // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
		    deep: true
		  }
	},
	onLoad() {},
	//组件生命周期
	created() {},
	mounted() {
		this.getEcharts();
		this.$refs.chart.init(config => {
			const { canvas } = config;
			const chart = echarts.init(canvas, null, config);
			chart.setOption(this.option);
			return chart;
		});
	},
	methods: {
		getEcharts() {
			const colors = ['red', 'orange', 'yellow', '#29ABE2'];
			this.option = {
				tooltip: {
					trigger: 'item'
				},
				color: colors,
				legend: {
					show: true,
					icon: 'circle',
					selectedMode: false, // 取消图例上的点击事件
					type: 'plain',
					orient: 'horizontal',
					left: '77%',
					top: 'center',
					align: 'left',
					itemGap: 10,
					itemWidth: 15, // 设置宽度
					itemHeight: 15 // 设置高度
				},
				series: [
					{
						name: '数据',
						type: 'pie',
						radius: ['35%', '50%'],
						center: ['40%', '40%'],
						itemStyle: {
							normal: {
								color: function(params) {
									return colors[params.dataIndex];
								}
							}
						},
						label: {
							show: true,
							position: 'outside',
							formatter: '{d}%'
						},
						emphasis: {
							itemStyle: {
								borderColor: '#fff',
								borderWidth: 10
							},
							label: {
								show: true,
								fontSize: '15',
								fontWeight: 'bold'
							}
						},
						labelLine: {
							normal: {
								length: 5,
								length2: 8,
								lineStyle: {
									width: 1
								}
							}
						},
						data: this.data
					}
				]
			};
		}
	}
};
</script>
<style lang="less" scoped></style>
