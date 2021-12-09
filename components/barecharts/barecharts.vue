<template>
	<view style="width: 100%; height:500upx"><l-echart ref="chart"></l-echart></view>
</template>
<script>
import * as echarts from '@/uni_modules/lime-echart/components/l-echart/echarts.js';
export default {
	name: 'barecharts',
	props: [],
	components: {},
	data() {
		return {
			option: {}
		};
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
			const colors = ['#FF0000', '#F15A24', '#00FF00', '#9CD809', '#00A600', '#29ABE2','#DB2BE0'];
			const dataList = [
				{
					value: 75,
					name: '火灾'
				},

				{
					value: 63,
					name: '境外安全'
				},

				{
					value: 43,
					name: '食品安全'
				},

				{
					value: 30,
					name: '人身事故'
				},

				{
					value: 30,
					name: '交通事故'
				},

				{
					value: 40,
					name: '信息安全'
				},
				{
					value: 40,
					name: '网络安全'
				}
			];
			this.option = {
				tooltip: {
					trigger: 'item'
				},
				color: colors,
				legend: {
					show: true,
					 icon: "circle", 
					selectedMode: false, // 取消图例上的点击事件
					type: 'plain',
					orient: 'horizontal',
					left: '76%',
					top: 'center',
					align: 'left',
					itemGap: 10,
					itemWidth: 15, // 设置宽度
					itemHeight: 15, // 设置高度
				},
				series: [
					{
						name: '数据',
						type: 'pie',
						radius: ['38%', '53%'],
						center: ['40%', '50%'],
						
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
							formatter: '{d}%',
							
						},
						emphasis: {
							itemStyle: {
								borderColor: '#fff',
								borderWidth: 10
							}
						},
						labelLine: {
							normal: {
								length: 10,
								length2: 15,
								lineStyle: {
									width: 1
								}
							}
						},
						data: dataList
					}
				]
			};
		}
	}
};
</script>
<style lang="less" scoped></style>
