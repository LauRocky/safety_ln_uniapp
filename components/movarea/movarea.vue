<template>
	<view class="movarea">
		<movable-area class="fixed-box">
			<movable-view class="fixed-button" direction="all" :inertia="true" y="100px">
				<view class="menuBox">
					<image class="mainMenu" src="http://cdn.heijinka.vip/business_add.png" @click="declick"></image>
					<view class="posi" :animation="animationData">
						<button style="background-color: transparent; display: inline-block; margin-top: 10rpx;" hover-class="none" open-type="contact">
							<image style="width: 50rpx; height: 50rpx;" src="http://cdn.heijinka.vip/business_my_photo.png" mode=""></image>
						</button>
						<image src="http://cdn.heijinka.vip/business_thumb.png" mode=""></image>
						<image src="http://cdn.heijinka.vip/shop_call_phone.png" mode=""></image>
					</view>
				</view>
			</movable-view>
		</movable-area>
	</view>
</template>
<script>
export default {
data(){
  return {
    animationData: {},
    off:true,
	animation:null
  }
},
onLoad() {
    this.animation = uni.createAnimation()
},
onShow(){
    var animation = uni.createAnimation({
        duration:500,
        trmingFunction:'ease'
    })
    this.animation = animation
},
methods:{
  // 悬浮按钮
  declick(){
    if(this.off){
      //使用动画
      this.rotateAndScale()
    }else{
      this.norotateAndScale()
    }
    this.off = !this.off
  },
//定义动画内容
rotateAndScale(){
  this.animation.rotate(0).translateY(-167).step();
  //导出动画数据传递给data层
  this.animationData = this.animation.export();
},
//当!off的时候动画回到原始位置
norotateAndScale(){
    this.animation.rotate(0).translateY(0).step();
    this.animationData = this.animation.export();
  },    
}
}
</script>
<style lang="less" scoped>
button::after {
	border: none;
}
.menuBox {
	width: 90rpx;
	height: 100%;
	z-index: 1;
	position: relative;
	right: -6rpx;
	bottom: 0rpx;
	overflow: hidden;
	border-radius: 45rpx;
	// background-color: red;
}
.fixed-box {
	pointer-events: none;
	width: 100vw;
	height: 100vh;
	position: fixed;
	left: 2px;
	bottom: 0;
	z-index: 100000;
}
.fixed-button {
	pointer-events: auto;
	width: 110rpx;
	height: 360rpx;
	right: 0;
	left: auto;
	top: 60vh;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 55rpx;
}
.mainMenu {
	width: 90rpx;
	height: 90rpx;
	background: #fff;
	position: absolute;
	left: 2rpx;
	bottom: -2rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 45rpx;
}
.posi {
	width: 108rpx;
	height: 360rpx !important;
	position: absolute;
	left: -6rpx;
	bottom: -316rpx;
	z-index: -1;
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: #fff;
	border-radius: 54rpx;
}
.posi > image {
	width: 50rpx;
	height: 50rpx;
	margin-top: 30rpx;
}

/* 适配iphonex 有底部横条的 */
@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
	.fixed-box {
		bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom);
	}
}
</style>
