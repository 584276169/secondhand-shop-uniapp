<template>
	<view class="content">
		<searchBox></searchBox>
		<category></category>
		<introBox :recommend="recommend"></introBox>
		<!--轮播图-->
		<view class="swiper_box">
			<u-swiper :list="Swiperlist" keyName="url" indicator :duration="600"></u-swiper>
		</view>
		<!--吸顶-->
		<u-sticky offsetTop="0" zIndex="10">
			<filterBox @changeTap="changeTap"></filterBox>
		</u-sticky>
		<!--列表-->
		<view class="product_container">
			<view class="product_title">
				<text>让我们一起致力于物品资源流转可续化</text>
			</view>
			<view class="product_content">
				<view class="product" v-for="(item,index) in list" :key="index" @click="Godetail(item.id)">
					<image :src="item.picUrl?item.picUrl[0]:'/static/none.png'" mode="aspectFill"></image>
					<view class="product_info" style="padding: 15rpx;">
						<view class="info_title">
							<text>{{item.title?item.title:''}}</text>
						</view>
						<view class="info_param">
							<text v-if="item.degree"
								:class="item.degree?'text_active tag':''">{{item.degree?item.degree:''}}</text>
							<text v-if="item.transactionMode"
								:class="item.transactionMode?'tag':''">{{item.transactionMode?item.transactionMode:''}}</text>
							<text v-if="item.deposit"
								:class="item.deposit?'text_active tag':''">{{item.deposit?item.deposit:''}}</text>
							<text v-if="item.subcategory"
								:class="item.subcategory?'text_active tag':''">{{item.subcategory?item.subcategory:''}}</text>
						</view>
						<view class="info_price">
							<text v-if="item.price">￥{{item.price?item.price:''}}</text>
							<text v-if="item.secondHandPrice">￥{{item.secondHandPrice?item.secondHandPrice:''}}</text>
							<text v-if="item.originPrice"
								class="originPrice">￥{{item.originPrice?item.originPrice:''}}</text>
						</view>
						<view class="info_user">
							<image :src="item.avatarUrl" mode="widthFix"></image>
							<text>{{item.address?item.address:''}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabbar :tab="0"></tabbar>
		<show-modal></show-modal>
	</view>
</template>

<script>
	import tabbar from "../../components/Tabbar.vue";
	import searchBox from "../../components/home/SearchBox.vue";
	import introBox from "../../components/home/introduce.vue";
	import category from "../../components/home/category.vue";
	import filterBox from "../../components/home/filter.vue";
	export default {
		data() {
			return {
				tap: 0,
				list: [], //商品列表数据
				Swiperlist: [], //轮播图数据
				recommend: [], //推荐商品数据
				page: 1, //页码
				totalnum: '', //商品列表总数据
			}
		},
		components: {
			introBox,
			tabbar,
			searchBox,
			category,
			filterBox,
		},
		onShow() {
			let openid = uni.getStorageSync('OPENID')
			if (!openid) {
				uni.login({
					success(res) {
						uni.setStorageSync('CODE', res.code)
					}
				})
			}
		},
		beforeRouteLeave(to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			var that = this
			let identify = uni.getStorageSync('OPENID')
			if (identify||to.name==="select"||to.name==="kinds"||to.name==="detail"||to.name==="home"){
                     next()
			} else {
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
											userInfo: JSON.stringify(userInfo),
											Code,
										}
									}).then(res => {
										if (res.data.code == 200) {
											next();
											let openid = res.data.openid
											uni.setStorageSync("OPENID", openid);
											uni.setStorageSync("NICKNAME", userInfo.nickName);
											uni.setStorageSync("AVATARURL", userInfo
												.avatarUrl);
										}
									})
								}
							})
						} else {
							next(false)
						}


					}
				})
			}

		},
		methods: {
			/*物品详情*/
			Godetail(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			/*changeTap商品大类别列表*/
			changeTap: function(id) {
				this.tap = id
				this.page = 1;
				this.list = [];
				this.GetProductList();
			},
			/*获取商品数据*/
			GetProductList: function() {
				var that = this
				that.$request({
					url: '/publish/GetProductList',
					method: "POST",
					data: {
						page: that.page,
						category: that.tap,
					}
				}).then(res => {
					if (res.data.code == 200) {
						console.log(res);
						this.totalnum = res.data.totalnum;
						that.list = that.list.concat(res.data.data);
					}
				})
			},
			/*获取轮播图数据*/
			SwiperList() {
				var that = this
				that.$request({
					url: '/manager/Swiperlist',
					method: "GET",
				}).then(res => {
					console.log(res);
					if (res.data.code == 0) {
						that.Swiperlist = res.data.data
						let temp = {}
						for (let i = 0; i < that.Swiperlist.length - 1; i++) {
							for (let j = 0; j < that.Swiperlist.length - 1; j++) {
								if (that.Swiperlist[j].sort < that.Swiperlist[j + 1].sort) {
									temp = that.Swiperlist[j]
									that.Swiperlist[j] = that.Swiperlist[j + 1]
									that.Swiperlist[j + 1] = temp
								}
							}
						}
					}
				})
			},
			/*推荐商品数据*/
			recommending() {
				var that = this
				that.$request({
					url: '/manager/recommending',
					method: "post",
				}).then(res => {
					console.log(res);
					if (res.data.code == 0) {
						that.recommend = res.data.data
					}
				})
			}
		},
		onReachBottom() {
			if (this.list.length !== this.totalnum) {
				this.page++;
				this.GetProductList();
			}
		},
		mounted() {
			this.GetProductList();
			this.SwiperList();
			this.recommending();
		}
	}
</script>
<style lang="scss">
	.swiper_box {
		margin: 0 25rpx;
		margin-top: 25rpx;
	}

	.product_container {
		padding: 15rpx;
		margin-bottom: 200rpx;
	}

	.product_title {
		font-size: $uni-font-size-h3;
		text-align: center;
		color: $uni-color-warning;
	}

	.product_content {
		display: flex;
		flex-wrap: wrap;

		.product {
			margin: 15rpx;
			background-color: #FFFFFF;
			width: 330rpx;
			border-radius: 25rpx;

			image {
				width: 320rpx;
				height: 320rpx;
				background-color: #FFFFFF;
				border-radius: 25rpx;
			}

			.info_user {
				margin-top: 15rpx;
				display: flex;
				align-items: center;
				font-size: $uni-font-size-h4;
				color: $uni-text-color-grey;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}

	.text_active {
		color: $uni-theme-color;
		border: 1rpx solid $uni-theme-color !important;
	}
</style>
