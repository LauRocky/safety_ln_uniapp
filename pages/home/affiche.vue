<template>
	<view class="affiche">
		<TwoNavbar :name="titles" />
		<view class="main">
			<view class="titles">
				{{title}}
			</view>
			<view class="" v-html="text">
				
			</view>
		</view>
	</view>
</template>
<script>
	import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue';
export default {
	name:"affiche",
	props: [],
	components: {},
	data() {
		return {
			titles:'公告详情',
			text:'',
			title:''
		};
	},
	onLoad(v) {
		this.title = v.title
		this.text = v.text
	},
	//组件生命周期
	created() {},
	mounted() {},
	methods: {}
};
</script>
<style lang="less" scoped>
	.affiche{
		.main{
			padding: 20upx;
			.titles{
				font-size: 35upx;
				font-weight: bold;
				text-align: center;
				padding: 15upx 0;
			}
			p{
				text-indent:20upx;
				line-height: 35upx;
			}
		}
	}
</style>
