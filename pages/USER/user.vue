<template>
	<view class="content">
		<view class="user_top">
			<view class="flex">
				<image :src="avatraUrl" mode="widthFix"></image>
				<text>{{nickName}}</text>
			</view>
			<view class="updateInfo" @click="GoInfo">
				<text>个人信息</text>
			</view>
		</view>
		<proNav v-if="showStock"></proNav>
		<funNav></funNav>
		<tabbar :tab="4"></tabbar>
	</view>
</template>

<script>
	import tabbar from "../../components/Tabbar.vue";
	import proNav from "../../components/user/product_nav.vue";
	import funNav from "../../components/user/function.vue";
	export default{
		data() {
			return {
				showStock:'',
			  nickName:'',
				  avatraUrl:'',
			}
		},
		onShow() {
			this.nickName=uni.getStorageSync("NICKNAME");
			this.avatraUrl=uni.getStorageSync("AVATARURL");
			this.showStock=false
			this.$nextTick(function(){
				this.showStock=true
			})
		},
		components:{
			tabbar,proNav,funNav
		},
		methods:{
			/*个人信息补充页面*/
			GoInfo:function(){
				uni.navigateTo({
					url:'./personalInfo'
				})
			}
		}
		}
</script>
<style lang="scss">
	.user_top{
		position: relative;
		padding: 25rpx;
		padding-bottom: 150rpx;
		background: $uni-theme-linear-color;
	 image{
		 width: 120rpx;
		 height: 120rpx;
		 border-radius: 50%;
	 }
	 text{
		 margin-left: 25rpx;
		 color: #FFFFFF;
		 font-size: $uni-font-size-h1;
	 }
	 .updateInfo{
		 position: absolute;
		 right: 0;
		 top:50rpx;
		 background:linear-gradient($uni-color-warning,#ffff20);
		 padding: 10rpx 25rpx;
		 border-top-left-radius: 30rpx;
		 border-bottom-left-radius: 30rpx;
		 text{
			 font-size: $uni-font-size-h2;
		 }
	 }
	}
</style>