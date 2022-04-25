<template>
	<view class="containerBox nav_content">
		<view class="flex_wrap">
			<view class="nav_tap" v-for="(item,index) in list" :key="index" @click="Godetail(item.id)">
				<view class="" v-if="item.id===1">
					<button type="default" open-type="contact" class="flex_column_center">
						<image :src="item.pic" mode="widthFix"></image>
						<text>{{item.title}}</text>
					</button>
				</view>
				<view class="flex_column_center" v-else>
					<image :src="item.pic" mode="widthFix"></image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						id: 0,
						title: '设置',
						pic: "/static/setup.png",
					},
					{
						id: 1,
						title: '客服',
						pic: '/static/customerservice.png',
					},
					{
						id: 2,
						title: '平台守则',
						pic: '/static/agreement.png',
					},
					{
						id: 4,
						title: '地址管理',
						pic: '/static/addressItem.png',
					},
					{
						id: 5,
						title: '我的信息',
						pic: '/static/userinfo.png',
					},
				]
			}
		},
		methods: {
			Godetail(id) {
				switch (id) {
					case 4:
						uni.navigateTo({
							url: './address'
						})
						break;
					case 0:
						uni.navigateTo({
							url: './setup'
						})
						break;
					case 2:
						uni.navigateTo({
							url: './agreementlist'
						})
						break;
						case 5:
						uni.navigateTo({
							url:'./personalInfo'
						})
				}
			}
		}
	}
</script>

<style lang="scss">
	.nav_content {
		margin-top: 25rpx;

		.nav_tap {
			font-size: $uni-font-size-h4;
			width: 145rpx;
			margin: 10rpx;

			text {
				margin-top: 10rpx;
				color: $uni-text-color;
			}

			image {
				width: 90rpx;
				height: 90rpx;
			}

			button {
				background-color: #FFFFFF;
				padding: 0;
				width: 145rpx;
				text {
					font-size: $uni-font-size-h4;
					color: $uni-text-color;
					margin: 0;
				}

				image {
					width: 90rpx;
					height: 90rpx!important;
				}
			}

			button::after {
				border: none;
			}
		}
	}
</style>
