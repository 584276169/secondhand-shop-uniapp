<template>
	<view>
		<view class="container" v-for="(item,index) in article" :key="index">
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
				 <u-album :urls="item.img"></u-album>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			article:{
				type:Array,
			}
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style lang="scss">
	.container{
		.forum_article{
					image{
						width: 75rpx;
						height: 75rpx;
						border-radius: 50%;
					}
					.article_user{
						margin-left: 15rpx;
						font-size: $uni-font-size-h3;
						color: $uni-text-color-placeholder;
						.user_text{
							margin-bottom: 10rpx;
							font-size: $uni-font-size-h2;
							color: $uni-theme-color;
						}
					}
					
					
				}
				.article_text{
					margin: 10rpx 0;
					font-size: $uni-font-size-h3;
				}
	}
</style>
