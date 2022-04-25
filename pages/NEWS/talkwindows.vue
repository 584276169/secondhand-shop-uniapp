<template>
	<view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true"
			style="padding: 25rpx;padding-bottom: 200rpx;box-sizing: border-box;height:1500rpx;">
			<view v-for="(item,index) in list" :key="index" style="margin-bottom: 45rpx;">
				<view class="" class="right" v-if="item.from==from">
					<view>
						<view class="talk_box_content">
							<view class="talk_box_right">
								<text class="newTip">{{item.status}}</text>
								<view class="talk_content_right">
									<view class="flex" v-if="item.data.title" @click="godetail(item.data.id)">
										<image :src="item.data.url" mode="aspectFill"></image>
										<view style="margin: 0 15rpx;">
											<view class="info_title">
												<text>{{item.data.title}}</text>
											</view>
											<view class="info_price">
												<text v-if="item.data.price">￥{{item.data.price}}</text>
												<text v-else>￥{{item.data.secondHandPrice}}</text>
											</view>
										</view>
									</view>
									<text v-else>{{item.data}}</text>
								</view>
							</view>
							<image :src="item.from_img" mode="aspectFill"></image>
						</view>
						<view class="talk_time_right">
							<text>{{item.time}}</text>
						</view>
					</view>
				</view>
				<view class="" class="left" v-else>
					<view>
						<view class="talk_box_content_left">
							<image :src="item.from_img" mode="aspectFill"></image>
							<view class="talk_box_left">
								<view class="talk_content_left">

									<view class="flex" v-if="item.data.title" @click="godetail(item.data.id)">
										<image :src="item.data.url" mode="aspectFill"></image>
										<view style="margin: 0 15rpx;">
											<view class="info_title">
												<text>{{item.data.title}}</text>
											</view>
											<view class="info_price">
												<text v-if="item.data.price">￥{{item.data.price}}</text>
												<text v-else>￥{{item.data.secondHandPrice}}</text>
											</view>
										</view>
									</view>
									<text v-else>{{item.data}}</text>
								</view>
							</view>
						</view>
						<view class="talk_time_left">
							<text>{{item.time}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!--商品链接-->
		<view class="containerBox bottom_product" v-if="show_link">
			<view class="" style="position: relative;">
				<view class="close" @click.stop="close">
				</view>
				<view class="sendTo shm_button_small_ThemeColor" @click.stop="sendServe">
					<text>发给客服</text>
				</view>
				<view class="flex_only">
					<image :src="ProductInfo.picUrl[0]" mode="aspectFill"></image>
					<view style="margin: 0 15rpx;">
						<view class="info_title">
							<text>{{ProductInfo.title}}</text>
						</view>
						<view class="info_price">
							<text v-if="ProductInfo.price">￥{{ProductInfo.price}}</text>
							<text v-else>￥{{ProductInfo.secondHandPrice}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--输入框-->
		<view class="container  bottom_input  flex_around">
			<input type="text" value="" v-model="value" />
			<view class="btn sendbtn" @click="sendmsg">

				<text>发送</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		socket
	} from '../../config/socket.js'
	export default {
		data() {
			return {
				scrollTop: 0,
				id: '', //商品id
				show_link: false,
				ProductInfo: {},
				value: '', //输入框消息
				list: [], //聊天内容
				from: '', //发送者
				to: '', //接收者
				from_img: '', //发送者头像
				to_img: '', //接收者头像
				from_nickName: '', //发送者昵称
				to_nickName: "", //接收者昵称
			};
		},
		onShow() {},
		onLoad(options) {
			this.to = options.to_key
			if (options.id) {
				this.id = options.id
				this.show_link = true
			}
			this.from = uni.getStorageSync("OPENID")
			this.from_img = uni.getStorageSync("AVATARURL")
			this.from_nickName = uni.getStorageSync("NICKNAME");
			this.getUserInfo();
			this.receiveMsg();
		},
		methods: {
			/*发送消息*/
			sendmsg() {
				let value = this.value
				if ((value ?? '') !== '') {
					socket.emit('SendMessage', {
						from: this.from,
						to: this.to,
						data: value,
						from_img: this.from_img,
						to_img: this.to_img,
						from_nickName: this.from_nickName,
						to_nickName: this.to_nickName,
					}, data => {
						data.status = "未读";
						this.list.push(data);
						this.scrollTop = 1000 * this.list.length
						this.RequestSubscribe()
					});
				} else {
					uni.showToast({
						title: "不能发送空值",
						icon: "error",
					})
				}
				this.value = ''
			},
			/*接收服务端的消息*/
			receiveMsg() {

				//******************更新打开我们聊天框的时间回执*******************************
				socket.emit("SendReceipt", {
					from: this.from,
					to: this.to
				});
				//*********************获取聊天记录********************
				socket.emit("GetchatRecord", {
					from: this.from,
					to: this.to
				}, data => {
					if (data) {
						data.forEach(i => {
							this.list.push(JSON.parse(i))
						})
						this.scrollTop = 1000 * this.list.length
					}
				});
				//************获取对方最近一次打开我们聊天窗的时间回执*******************
				socket.emit("GetReceipt", {
					from: this.from,
					to: this.to
				}, data => {
					if (data) {
						for (let i = this.list.length - 1; i >= 0; i--) {
							if (this.list[i].timeStamp > data && this.list[i].from == this.from) {
								this.$set(this.list[i], "status", "未读");
							} else {
								break;
							}
						}
					} else {
						for (let i = this.list.length - 1; i >= 0; i--) {
							if (this.list[i].from == this.from) {
								this.$set(this.list[i], "status", "未读");
							}
						}
					}
				});
				//************聊天过程中接收到对方传过来的消息回执*******************
				socket.on("AcceptReceipt", data => {
					if (data.from === this.to) {
						//将未读变为已读取
						for (let i = this.list.length - 1; i >= 0; i--) {
							if (this.list[i].status) {
								this.$set(this.list[i], "status", "已读");
							} else {
								break;
							}
						}
					}
				});
				//************聊天过程中接收到对方传过来的消息而且我正处于和该对方聊天的窗口*******************
				socket.on("GetMessage", data => {
					var that = this
					if (data.from === that.to) {
						socket.emit("SendReceipt", {
							from: that.from,
							to: that.to
						})
						that.list.push(data);
						that.scrollTop = 1000 * that.list.length
					}
				})


			},
			//获取对方以及商品信息
			getUserInfo() {
				var that = this
				that.$request({
					url: '/news/getuserInfo',
					method: 'POST',
					data: {
						to_key: that.to,
						id: that.id,
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 200) {
						that.to_nickName = res.data.data[0][0].nickName
						uni.setNavigationBarTitle({
							title: that.to_nickName,
						})
						that.to_img = res.data.data[0][0].avatarUrl
						if (res.data.data[1][0]) {
							that.ProductInfo = res.data.data[1][0]
						}
					}
				})
			},
			/*返回上一页*/
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			/*关闭商品链接*/
			close() {
				this.show_link = !this.show_link
			},
			/*发送商品链接*/
			sendServe() {
				let param = {
					id: this.id,
					url: this.ProductInfo.picUrl[0],
					title: this.ProductInfo.title,
					price: this.ProductInfo.price,
					secondHandPrice: this.ProductInfo.secondHandPrice,
				};
				socket.emit('SendMessage', {
					from: this.from,
					to: this.to,
					data: param,
					from_img: this.from_img,
					to_img: this.to_img,
					from_nickName: this.from_nickName,
					to_nickName: this.to_nickName,
				}, data => {
					this.show_link = !this.show_link
					data.status = "未读";
					this.list.push(data);
					this.scrollTop = 1000 * this.list.length
				});
			},
			/*点击商品链接*/
			godetail(id) {
				uni.navigateTo({
					url: '../HOME/detail?id=' + id,
				})
			},
			/*消息订阅通知*/
			RequestSubscribe:function(){
				uni.requestSubscribeMessage({
					tmplIds:['b0e2UqgRszMus8PIqdjcqKuWsFIU0mlkF0YqIvCJKuE'],
				})
			},
		},
		beforeDestroy() {
			//************断开连接*******************
			this.to = '';
			socket.emit("BreakOff", {
				from: this.from,
				to: this.to
			})
		}
	}
</script>

<style lang="scss">
	.right {
		display: flex;
		flex-direction: row-reverse;
	}

	.left {
		display: flex;
		flex-direction: row;
	}

	.talk_box_content {
		display: flex;
		align-items: flex-start;

		image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			margin-left: 10rpx;
		}
	}

	.talk_box_right {
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
	}

	.talk_box_left {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
	}

	.talk_box_content_left {
		display: flex;
		align-items: flex-start;

		image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			margin-right: 10rpx;
		}
	}

	.talk_content_right {
		padding: 10rpx 20rpx;
		background-color: $uni-color-success;
		border-radius: 25rpx;
		color: #FFFFFF;
		font-size: $uni-font-size-h2;

		image {
			width: 180rpx;
			height: 180rpx;
			border-radius: 10rpx;
		}
	}

	.talk_content_left {
		font-size: $uni-font-size-h2;
		display: inline-block;
		padding: 10rpx 20rpx;
		background-color: #FFFFFF;
		border-radius: 25rpx;

		image {
			border-radius: 10rpx;
			width: 180rpx;
			height: 180rpx;
		}
	}

	.newTip {
		font-size: $uni-font-size-h4;
		color: $uni-text-color-grey;
		display: inline-block;
		margin-right: 20rpx;
	}

	.talk_time_right {
		font-size: $uni-font-size-h4;
		margin-top: 10rpx;
		color: $uni-text-color-grey;
		text-align: right;
	}

	.talk_time_left {
		text-align: left;
		font-size: $uni-font-size-h4;
		margin-top: 10rpx;
		color: $uni-text-color-grey;
	}

	.bottom_input {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;

		input {
			width: 500rpx;
			background-color: #FAFAFA;
			border-radius: 35rpx;
			height: 65rpx;
			font-size: $uni-font-size-h2;
			padding-left: 25rpx;
		}

		.sendbtn {
			padding: 15rpx 35rpx;
			margin: 0 5rpx;
		}
	}

	.top {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		right: 0;
		background-color: $uni-theme-color;
		height: 120rpx;
		color: #FFFFFF;
		font-size: $uni-font-size-h1;

		image {
			width: 50rpx;
			height: 50rpx;
			margin-right: 25rpx;
		}
	}

	.bottom_product {
		border: 4rpx solid #eee;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 130rpx;

		image {
			width: 140rpx;
			height: 140rpx;
			border-radius: 25rpx;
		}

		.sendTo {
			position: absolute;
			right: 0;
			bottom: 0rpx;
		}

		.close {
			position: absolute;
			right: 0;
			top: 0;
			width: 25rpx;
			height: 5rpx;
			background: #333;
			transform: rotate(45deg);
		}

		.close::after {
			content: '';
			display: block;
			width: 25rpx;
			height: 5rpx;
			background: #333;
			transform: rotate(-90deg);
		}
	}
</style>
