<template>
	<view>
		 <view class="btn signout" @click="signOut">
		 	 <text>退出</text>
		 </view>
		 <show-modal></show-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			signOut(){
				this.$showModal({
					content:'是否确认退出登录',
					success:function(res){
						if(res.confirm){
						  uni.clearStorage()
						  uni.switchTab({
						  	url:'/pages/HOME/home'
						  })
						}
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
.signout{
	margin-top: 100rpx;
}
</style>
