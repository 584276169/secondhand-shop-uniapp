<template>
	<view>
		<view class="" style="margin-bottom: 250rpx;">
			<view class="form_addArticle">
				<text @click="publish">发表文章</text>
			</view>
			<view class="container forum_content" v-for="(item,index) in list" :key="index" @click="Godetail(item.id)">
				<view class="flex forum_article">
					<image :src="item.avatarUrl" mode="aspectFill"></image>
					<view class="article_user flex_column">
						<text class="user_text">{{item.nickName}}</text>
						<text>{{item.time}}</text>
					</view>
				</view>
				<view class="article_text">
					<text user-select>{{item.text}}</text>
				</view>
				<view class="">
					<u-album :urls="item.img" :previewFullImage="false"></u-album>
				</view>
				<view class="article_btn flex_around">
					<view class="btn_content" v-for="(child,indexOI) in btn_logo" :key="indexOI"
						@click.stop="seedetail(child.id,item.id,index,item)">
						<view class="btn_tap" v-if="child.id===0">
							<button type="default" open-type="share">
								<image :src="child.icon" mode="aspectFill"></image>
							</button>
						</view>
						<view class="btn_tap" v-else>
							<image :src="child.icon" mode="aspectFill"></image>
							<text v-show="child.liked">{{item.liked}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabbar :tab="1"></tabbar>
		<showModal></showModal>
	</view>
</template>

<script>
	import tabbar from "../../components/Tabbar.vue";
	export default {
		data() {
			return {
				page: 1,
				totalnum: '',
				list: [],
				btn_logo: [{
						icon: '../../static/article_share.png',
						id: 0,
					},
					{
						icon: '../../static/article_msg.png',
						id: 1,
					},
					{
						icon: '../../static/article_like.png',
						id: 2,
						liked: true,
					},
				]
			}
		},
		components: {
			tabbar
		},
		methods: {
			/*发表文章*/
			publish() {
				uni.navigateTo({
					url: './publishArticle'
				})
			},
			/*获取文章列表*/
			articlesList() {
				var that = this
				that.$request({
					url: '/forum/articlesList',
					method: "POST",
					data: {
						page: that.page,
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 0) {
						that.list = that.list.concat(res.data.data)
						that.totalnum = res.data.totalnum
					}
				})
			},
			/*详情*/
			Godetail(id) {
				uni.navigateTo({
					url: './articleDetail?id=' + id,
				})
			},
			/*操作按钮*/
			seedetail(Childid, Itemid, index, item) {
				var that = this
				if (Childid === 0) {
				} else if (Childid === 1) {
					that.Godetail(Itemid);
				} else {
					that.$request({
						url: '/forum/articleLiked',
						method: "POST",
						data: {
							id: Itemid,
						}
					}).then(res => {
						console.log(res);
						if (res.data.code == 0) {
							let like = that.list[index].liked + 1
							console.log(like);
							that.$set(that.list[index], 'liked', like);
						}
					})
				}
			}
		},
		mounted() {
			this.articlesList()
		},
		onReachBottom() {
			if (this.list.length !== this.totalnum) {
				uni.showLoading({})
				this.page++
				this.articlesList();
				uni.hideLoading()
			}
		},
		async onPullDownRefresh() {
			this.page = 1
			this.list = []
			await this.articlesList();
			uni.stopPullDownRefresh()
		},
		created() {
			let openid = uni.getStorageSync('OPENID')
			if ((openid ?? '') == '') {
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
			if (identify || to.name === "home") {
				next();
			} else if ((identify ?? '') == '') {
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
									console.log(res);
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
	}
</script>

<style lang="scss">
	.form_addArticle {
		padding: 25rpx;
		overflow: hidden;

		text {
			float: right;
			font-size: $uni-font-size-h2;
			color: $uni-theme-color;
		}
	}

	.forum_content {
		margin-bottom: 25rpx;

		.forum_article {
			image {
				width: 75rpx;
				height: 75rpx;
				border-radius: 50%;
			}

			.article_user {
				margin-left: 15rpx;
				font-size: $uni-font-size-h3;
				color: $uni-text-color-placeholder;

				.user_text {
					margin-bottom: 10rpx;
					font-size: $uni-font-size-h2;
					color: $uni-theme-color;
				}
			}


		}

		.article_text {
			margin: 10rpx 0;
			font-size: $uni-font-size-h3;
		}

		.article_btn {
			margin-top: 10rpx;
			padding-top: 10rpx;
			border-top: 0.5rpx solid $uni-bg-color-grey;

			.btn_content {
				flex: 1;

				.btn_tap {
					text-align: center;

					image {
						width: 37rpx;
						height: 37rpx;
					}

					text {
						font-size: $uni-font-size-h3;
						margin-left: 10rpx;
					}
					button{
						background-color: #FFFFFF;
						padding: 0;
						height: 37rpx;
						line-height: 37rpx;
					}
					button::after{
						border: none;
					}
				}
			}
		}
	}
</style>
