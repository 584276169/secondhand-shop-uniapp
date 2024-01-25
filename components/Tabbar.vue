<template name="tabbar">
	<view class="content">
	<view class="tabbar" >
	<view class="" style="position: relative;">
		<view class="" style="display: flex;align-items: center;height: 100%;justify-content: space-between;">
			<view class="tabbar_item" v-for="(item,index) in list" :key="index" @click="changeTab(index,item.pagePath)">
				<image :src="tab==index?item.selectedIconPath:item.iconPath" mode="widthFix"></image>
				<text :class="tab==index?'active':''">{{item.text}}</text>
			</view>
		</view>
		<!--发布图标-->
		<view class="publish_logo" @click="Gopublish">
			<image src="../static/publish_active.png" mode=""></image>
		</view>
	</view>
	</view>
	<!--发布选择-->
	 <view class="animate__animated animate__bounceInUp choose_content" v-if="showpub">
	 	<view class="" style="display: flex;align-items: center;justify-content:space-between;position:relative;z-index:11">
	 		<view class="item_tap" @click="Gopub(0)">
	 			<image src="../static/pub_logo1.png" mode="widthFix"></image>
	 			<text>出二手</text>
	 		</view>
	 		<view class="item_tap" @click="Gopub(1)">
	 			<image src="../static/pub_log2.png" mode="widthFix"></image>
	 			<text>出租</text>
	 		</view>
	 		<view class="item_tap" @click="Gopub(2)">
	 			<image src="../static/pub_logo1.png" mode="widthFix"></image>
	 			<text>求二手</text>
	 		</view>
	 		<view class="item_tap" @click="Gopub(3)">
	 			<image src="../static/pub_log2.png" mode="widthFix"></image>
	 			<text>求租</text>
	 		</view>
	 	</view>
	 </view>
	</view>
</template>

<script>
	export default {
		name:"tabbar",
		data() {
			return {
				aa:true,
				showpub:false,
				list:[{
						pagePath: "/pages/HOME/home",
						iconPath:"/static/home.png",
						selectedIconPath:"/static/home_active.png",
						text: "逛逛"
					},
					{
							pagePath: "/pages/Forum/forum",
							iconPath:"/static/forum.png",
							selectedIconPath:"/static/forum_active.png",
							text: "社区"
						},
					{
							pagePath: "/",
							text: "发布"
						},
						{
								pagePath: "/pages/NEWS/news",
								iconPath:"/static/message.png",
								selectedIconPath:"/static/message_active.png",
								text: "消息"
							},
					{
							pagePath: "/pages/USER/user",
							iconPath:"/static/user.png",
							selectedIconPath:"/static/user_active.png",
							text: "我的"
						},
				],
				
			};
		},
		props:{
		 tab:{
			 type:String,
		 }
		},
			methods:{
			changeTab:function(index,url){
				uni.switchTab({
					url:url
				})
				this.showpub=false
			},
			Gopublish:function(){
				this.showpub=!this.showpub
			},
			Gopub:function(id){
				switch(id){
					case 0 :
					uni.navigateTo({
						url:'/pages/PUBLISH/publish'
					});
					break;
					case 1 :
					uni.navigateTo({
						url:'/pages/PUBLISH/rentout'
					});
					break;
					case 2 :
					uni.navigateTo({
						url:'/pages/PUBLISH/seekpublish'
					});
					break;
					case 3 :
					uni.navigateTo({
						url:'/pages/PUBLISH/seekrentout'
					});
					break;
				}
				this.showpub=false
			}
			},
			created() {
			},
	}
</script>

<style lang="scss">
	.tabbar{
		width: 100%;
		height: 130rpx;
		background-color: #FFFFFF;
		position: fixed;
		right: 0;
		left: 0;
		bottom: 0;
		padding: 15rpx;
		z-index: 10;
		box-sizing: border-box;
		box-shadow:0 0 10rpx;
		
	}
	.tabbar_item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 130rpx;
	}
	.tabbar_item image{
		width: 50rpx;
		height: 50rpx;
	}
	.tabbar_item text{
		font-size: 30rpx;
		margin-top: 10rpx;
	}
	.active{
		color: $uni-theme-color;
	}
	.publish_logo{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 40rpx;
		padding: 20rpx;
		background-color:#FAFAFA;
		border-radius: 50%;
	
		image{
			width: 120rpx;
			height: 120rpx;
		}
	}
	.choose_content{
		background-color: #FFFFFF;
		position: fixed;
		right: 0;
		left: 0;
		bottom: 250rpx;
		padding: 15rpx;
		z-index: 10;
		box-sizing: border-box;
		margin: 0 50rpx;
		background-color:rgba(255,255,255,0.3);
		border-radius: 50rpx;
		
	}
	.item_tap{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 150rpx;
		font-size: $uni-font-size-h2;
	}
	.item_tap image{
		margin-bottom: 10rpx;
	  width:80rpx;
		  height:80rpx;
	}
</style>
