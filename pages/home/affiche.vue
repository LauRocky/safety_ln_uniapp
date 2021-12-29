<template>
	<view class="affiche">
		<TwoNavbar :name="titles" />
		<view class="main">
			<view class="titles">{{ obj.newsName }}</view>
			<view class="names">{{ obj.publisher }}</view>
			<view class="context">{{ obj.context }}</view>
		</view>
	</view>
</template>
<script>
import TwoNavbar from '../../components/TwoNavbar/TwoNavbar.vue';
import { removeTag } from '../../utils/utils.js';
export default {
	name: 'affiche',
	props: [],
	components: {},
	data() {
		return {
			titles: '公告详情',
			obj: {},
			id: ''
		};
	},
	onLoad(v) {
		this.id = v.id;
		this.handInfo();
	},
	//组件生命周期
	created() {},
	mounted() {},
	methods: {
		handInfo() {
			//获取隐患类型
			this.$http(`/news/info/${this.id}`, 'POST', {}, false)
				.then(res => {
					if (res.code == 0) {
						res.data.context = removeTag(res.data.newsText);
						this.obj = res.data;
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>
<style lang="less" scoped>
.affiche {
	.main {
		padding: 20upx;
		.titles {
			font-size: 35upx;
			font-weight: bold;
			text-align: center;
			padding: 10upx 0;
		}
		.names {
			padding-bottom: 10upx;
			text-align: center;
		}
		.context {
			text-indent: 50upx;   //首行间距
			letter-spacing: 2upx;   //字体间距
			line-height: 50upx;
		}
	}
}
</style>
