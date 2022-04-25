<template>
	<view class="content">
		<view class="" style="padding: 25rpx;">
			<view class="flex_only new" v-for="(item,index) in list" :key="index" @click="Gotalk(item.from,item.to)">
				<image :src="item.from===openid?item.to_img:item.from_img" mode="widthFix"></image>
				<view class="flex_column new_neir">
					<text class="to_nickName">{{item.from===openid?item.to_nickName:item.from_nickName}}</text>
					<text class="to_data">{{item.data.title?'图片':item.data}}</text>
				</view>
				<view class="to_time">
					<text >{{item.time?item.time:''}}</text>
				</view>
				<view class="Unread" v-if="item.status===1">
				</view>
			</view>
		</view>
		<tabbar :tab="1"></tabbar>
	</view>
</template>

<script>
	import {socket} from '../../config/socket.js'
	import tabbar from "../../components/Tabbar.vue";
	export default{
		data() {
			return {
				list:[],
				openid:'',
			}
		},
		components:{
			tabbar,
		},
		
		methods:{
			/*socket.io登录*/
			loginSocket(){
				
			},
			/*打开聊天*/
			Gotalk(from,to){
				if(this.openid!==from){
					uni.navigateTo({
						url:'./talkwindows?to_key=' + from
					})
				}else{
					uni.navigateTo({
						url:'./talkwindows?to_key=' + to
					})
				}
			},
			/*获取聊天列表*/
			getNewsList(){
				var that=this
				that.$request({
					url:'/news/getNewsList',
					method:'POST',
				}).then(res=>{
					console.log(res);
					if(res.data.code==200){
						that.list=res.data.data
			        that.list.forEach((i,j)=>{
						if(i.status===1){
							that.list.splice(j,1);
							that.list.unshift(i);
							
						}
					})
						uni.stopPullDownRefresh()
					}
				})
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.openid=uni.getStorageSync("OPENID")
			this.getNewsList();
			this.loginSocket();
		},
         onPullDownRefresh() {
         	this.getNewsList();
         }
		}
</script>

<style lang="scss">
	.new{
		padding: 15rpx 0;
		border-bottom: 1rpx solid #eee;
		position: relative;
		image{
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
		.to_time{
			position: absolute;
			right: 0;
			top: 0;
			font-size: $uni-font-size-h3;
			color:$uni-text-color-grey ;
		}
		.Unread{
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 30rpx;
			height: 30rpx;
			border-radius: 50%;
			background-color:$uni-theme-color;
		}
	}
	.new_neir{
		margin-left: 15rpx;
		.to_nickName{
			font-size: $uni-font-size-h2;
			margin-bottom: 15rpx;
		}
		.to_data{
			font-size: $uni-font-size-h4;
			color:$uni-text-color-grey;
		}
	}
</style>

