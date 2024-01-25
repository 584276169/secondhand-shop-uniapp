<template>
	<view>
		<view class="container person_top">
			<view class="flex_around top_content" v-for="(item,index) in userInfo" :key="index">
				<view class="top_stock flex_column_center">
					<text class="stock_num">{{totalnum}}</text>
					<text class="info_name" >发布商品</text>
				</view>
				<view class="top_img">
					<image :src="item.avatarUrl" mode="widthFix"></image>
				</view>
				<view class="top_info flex_column_center">
					<text class="info_name">{{item.nickName}}</text>
					<text>{{item.time}}</text>
				</view>

			</view>
		</view>
		<view class="container personal_product" style="margin-top:30rpx;">
			<view class="modul_title">
				<text>店铺商品</text>
			</view>
			<view class="product flex" v-for="(item,indexOI) in list" :key="indexOI" @click="Godetail(item.id)">
				<image :src="item.picUrl?item.picUrl:'/static/none.png'" mode="aspectFill"></image>
				<view class="product_info flex_column">
					<view class="info_title">
						<text>{{item.title?item.title:''}}</text>
					</view>
					<view class="info_param">
						<text :class="item.degree?'text_active tag':''">{{item.degree?item.degree:''}}</text>
						<text
							:class="item.transactionMode?'tag':''">{{item.transactionMode?item.transactionMode:''}}</text>
					</view>
					<view class="info_price">
						<text>￥{{item.secondHandPrice?item.secondHandPrice:''}}</text>
						<text class="originPrice">￥{{item.originPrice?item.originPrice:''}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openid: '',
				page: 1,
				totalnum: '',
				list: [],
				userInfo: [],
			};
		},
		onLoad(options) {
			this.openid = options.openid
		},
		mounted() {
			this.getUserInfo();
		},
		methods: {
			/*查看商品详情*/
			Godetail(id) {
				uni.navigateTo({
					url: '../HOME/detail?id=' + id
				})
			},
			/*获取用户商品以及个人消息*/
			getUserInfo() {
				var that = this
				that.$request({
					url: '/USER/getpersonal',
					method: "POST",
					data: {
						openid: that.openid,
						page: that.page,
					}
				}).then(res => {
					if (res.data.code == 200) {
						console.log(res);
						that.totalnum = res.data.totalnum
						that.userInfo = res.data.data[0]
						that.list = that.list.concat(res.data.data[2])
					}
				})
			}
		},
		onReachBottom() {
			if (this.list.length !== this.totalnum) {
				this.page++
				this.getUserInfo()
			}
		},
	}
</script>

<style lang="scss">
	.person_top {
		background: $uni-theme-linear-color;
		height: 180rpx;

		.top_content {
			margin: 60rpx 30rpx 0rpx 30rpx;
			background-color: #FFFFFF;
			padding: 15rpx;
			border-radius: 25rpx;
			box-shadow:1rpx 2rpx 2rpx 2rpx rgba(0, 0, 0, 0.3);
            .top_stock{
				font-size: $uni-font-size-h3;
				.stock_num{
					font-size: $uni-font-size-g1;
					font-weight: bold;
				}
			}
			.top_img {
				margin-top: -90rpx;
				padding: 15rpx;
				background-color: #FFFFFF;
				border-radius: 50%;

				image {
					border-radius: 50%;
					width: 140rpx;
					height: 140rpx;
				}
			}

			.top_info {
				font-size: $uni-font-size-h3;
				.info_name {
					font-size: $uni-font-size-h1;
					margin-bottom: 15rpx;
				}
			}
		}
	}

	.product {
		margin-bottom: 15rpx;

		image {
			width: 270rpx;
			height: 270rpx;
			border-radius: 25rpx;
		}

		.product_info {
			margin-left: 15rpx;
			height: 270rpx;
		}
	}

	.text_active {
		color: $uni-theme-color;
		border: 1rpx solid $uni-theme-color !important;
	}
</style>
