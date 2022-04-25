<template>
	<view class="content">
		<input @click="Goselect" type="text" value="" placeholder="找点什么" disabled />
	</view>
</template>

<script>
	export default {
		name:"SearchBox",
		data() {
			return {
				
			};
		},
		methods:{
			Goselect:function(){
				uni.switchTab({
					url:'./select'
				})
			}
		}
	}
</script>

<style lang="scss">
 .content{
	 position: fixed;
	 top: 0;
	 left: 0;
	 right: 0;
	 padding: 15rpx;
	 z-index: 10;
	 background: $uni-theme-linear1-color;
	 input{
		 background-color: #FFFFFF;
		 margin: 0 25rpx;
		 height: 60rpx;
		 border-radius: 50rpx;
		 padding-left: 20rpx;
		 font-size: $uni-font-size-h2;
	 }
 }
</style>
