<template>
	<view>
		<!--卖家信息-->
		<view class="container" style="position: relative;">
			<view class="share">
				<button type="default" open-type="share">
					<image src="../../static/share.png" mode="aspectFill"></image>
				</button>
			</view>
			<view class="detail_user flex" @click="GOhome(list.openid)">
				<image :src="list.avatarUrl?list.avatarUrl:'/static/none.png'" mode="widthFix"></image>
				<text>{{list.address?list.address:''}}</text>
			</view>
			<view class="detail_title">
				<text>{{list.title?list.title:''}}</text>
			</view>
			<view class="detail_price">
				<text v-if="list.secondHandPrice" class="secondHandPrice">￥{{list.secondHandPrice?list.secondHandPrice:''}}</text>
				<text v-if="list.originPrice" class="originPrice" style="font-size: 30rpx;">￥{{list.originPrice?list.originPrice:''}}</text>
			    <text v-if="list.price" class="secondHandPrice">￥{{list.price?list.price:''}}</text>
			</view>
		</view>
		<!--参数信息-->
		<view class="container" style="margin-top: 25rpx;">
		   <text class="modul_title">商品参数</text>
		   <view class="info_param">
		   	 <text v-if="list.degree" class="tag">{{list.degree?list.degree:''}}</text>
			 <text v-if="list.transactionMode" class="tag">{{list.transactionMode?list.transactionMode:''}}</text>
			 <text v-if="list.category==0" class="tag">{{list.category==0?'出二手':''}}</text>
			  <text v-if="list.category==1" class="tag">{{list.category==1?'出租':''}}</text>
			   <text v-if="list.category==2" class="tag">{{list.category==2?'求二手':''}}</text>
			    <text v-if="list.category==3" class="tag">{{list.category==3?'求租':''}}</text>
			  <text v-if="list.subcategory" class="tag">{{list.subcategory?list.subcategory:''}}</text>
			   <text v-if="list.deposit" class="tag">{{list.deposit?list.deposit:''}}</text>
		   </view>
		</view>
		<!--商品详细信息-->
		<view class="container" style="margin:25rpx 0 200rpx 0;">
			<text class="modul_title">商品详情</text>
			<view class="detail_remarks">
				<text>{{list.remark?list.remark:''}}</text>
			</view>
			<view class="detail_picUrl" v-for="(item,index) in list.picUrl" :key="index" @click="preview(item)">
				<image :src="item" mode="aspectFill"></image>
			</view>
		</view>
	   <!--底部导航-->
	   <bottomNav @goNext="GoNext" @getCollect="Oncollect"  :collect="collect"></bottomNav>
	   <show-modal></show-modal>
	</view>
</template>

<script>
	import bottomNav from '../../components/home/bottomNav.vue'
	export default {
		data() {
			return {
				id: '',
				list: {},
				collect:false,
			};
		},
		components:{
			bottomNav,
		},
		onLoad(options) {
			this.id = options.id
			this.Getdetail();
			let openid=uni.getStorageSync('OPENID')
			if(!openid){
				uni.login({
					success(res) {
						uni.setStorageSync('CODE', res.code)
					}
				})
			}
		},
		methods: {
			/*收藏*/
			Oncollect(){
				var that=this
				let openid=uni.getStorageSync("OPENID");
				if(!openid){
					//无登录
					that.$showModal({
						content: '是否登入并且继续使用该程序',
						cancelText: "拒绝",
						confirmText: "去授权",
						success: function(res) {
							if (res.confirm) {
								let Code = uni.getStorageSync("CODE");
								uni.getUserProfile({
									desc: "获取用户信息",
									success(res) {
										let iv = res.iv
										let encryptedData = res.encryptedData
										let signature = res.signature
										let userInfo = res.userInfo
										that.$request({
											url: '/User/QuickLogin',
											method: 'POST',
											data: {
												iv,
												encryptedData,
												signature,
												userInfo:JSON.stringify(userInfo),
												Code,
											}
										}).then(res => {
											if (res.data.code == 200) {
												let openid = res.data.openid
												uni.setStorageSync("OPENID", openid);
												uni.setStorageSync("NICKNAME",userInfo.nickName);
												uni.setStorageSync("AVATARURL",userInfo.avatarUrl);
											}
										})
									}
								})
							} else {
								
							}
					
					
						}
					})
				}else{
					//有登录
					if(that.collect==false){
						that.$request({
							url:'/publish/collect',
							method:"POST",
							data:{
								id:that.id,
							}
						}).then(res=>{
							console.log(res);
							if(res.data.code==200){
								that.collect=true
							}
						})
					}else{
						that.$request({
							url:'/publish/CancelCollect',
							method:"POST",
							data:{
								id:that.id,
							}
						}).then(res=>{
							console.log(res);
							if(res.data.code==200){
								that.collect=false
							}
						})
					}
				}
			},
			/*预览图片*/
			preview(url){
				let list=[]
				list.push(url)
				uni.previewImage({
					urls:list,
				})
			},
			/*查看主页*/
			GOhome(openid){
				uni.navigateTo({
					url:'/pages/USER/personalHome?openid=' + openid,
				})
			},
			/*咨询/购买*/
			GoNext(id){
				if(id==1){
					/*咨询*/
					uni.navigateTo({
						url:'../NEWS/talkwindows?id=' + this.id + "&to_key=" + this.list.openid,
					})
				}else if(id==2){
					/*复制微信号*/
				if(this.list.wechatNumber){
					uni.setClipboardData({
						data:this.list.wechatNumber
					})
				}else{
					uni.showToast({
						title:"对方未设置微信",
						icon:'error'
					})
				}
				}
			},
			Getdetail() {
				var that = this
				that.$request({
					url: '/publish/Getdetail',
					method: 'POST',
					data: {
						id: that.id,
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 200) {
						that.list = res.data.data[0]
						that.collect=res.data.collect
					}
				})
			}
		},
		beforeRouteLeave(to, from, next) {
			var that=this
			let openid=uni.getStorageSync("OPENID");
			if(!openid) {
				that.$showModal({
					content: '是否登入并且继续使用该程序',
					cancelText: "拒绝",
					confirmText: "去授权",
					success: function(res) {
						if (res.confirm) {
							let Code = uni.getStorageSync("CODE");
							uni.getUserProfile({
								desc: "获取用户信息",
								success(res) {
									let iv = res.iv
									let encryptedData = res.encryptedData
									let signature = res.signature
									let userInfo = res.userInfo
									that.$request({
										url: '/User/QuickLogin',
										method: 'POST',
										data: {
											iv,
											encryptedData,
											signature,
											userInfo:JSON.stringify(userInfo),
											Code,
										}
									}).then(res => {
										if (res.data.code == 200) {
											next();
											let openid = res.data.openid
											uni.setStorageSync("OPENID", openid);
											uni.setStorageSync("NICKNAME",userInfo.nickName);
											uni.setStorageSync("AVATARURL",userInfo.avatarUrl);
										}
									})
								}
							})
						} else {
							next(false)
						}
				
				
					}
				})
			} else {
				next()
			}
		}
	}
</script>

<style lang="scss">
	.detail_user{
		text{
			font-size: $uni-font-size-h3;
			margin-left: 15rpx;
		}
		image{
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
		}
	}
.detail_title{
	margin-top: 15rpx;
	font-size: $uni-font-size-h1;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	/* 这里是超出几行省略 */
	overflow: hidden;
}
.detail_price{
	margin-top: 25rpx;
	.secondHandPrice{
		font-size: $uni-font-size-g1;
		color: $uni-theme-color;
	}
}
.detail_picUrl{
	margin: 15rpx auto;
	image{
		width: 100%;
		border-radius: 25rpx;
	}
}
.detail_remarks{
	font-size: $uni-font-size-h2;
	margin-top: 15rpx;
}
.share{
	position: absolute;
	right: 25rpx;
	button{
		background-color: #FFFFFF;
		padding: 0;
		image{
			width: 45rpx;
			height: 45rpx;
		}
	}
	button::after {
		border: none;
	}
}
</style>
