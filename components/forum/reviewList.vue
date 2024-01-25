<template>
	<view class="container review_content">
		<view class="review_item">
			<view class="item" v-for="(item,indexOI) in list" :key="indexOI"  v-if="item.parent_id==parent_id">
				<view class="review_tap flex_only">
					<image :src="item.avatarUrl" mode="aspectFill"></image>
					<view class="tap_info">
						<text>{{item.nickName}}</text>
					</view>
				</view>
				<view class="review_text">
					<view class="text_content">
						<text>{{item.text}}</text>
					</view>
					<view class="text_more" v-if="item.reply!==0">
						<text @click="openPoP(item)">更多回复>{{item.reply}}</text>
					</view>
					<view class="text_grey flex_between">
						<view class="grey_time">
							<text>{{item.time}}</text>
						</view>
						<view class="grey_btn">
							<view class="flex">
								<view class="btn_icon" v-for="(child,index) in btn_logo" :key="index"
									@click="reply(child.id,item.id,item.nickName,indexOI)">
									<image :src="child.icon" mode="aspectFill"></image>
									<text v-if="child.liked">{{item.liked}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				
			}
		},
		props:{
			list:{
			type:Array,
			default:[]
			},
			btn_logo:{
				type:Array,
				default:[]
			},
			parent_id:{
				type:Number,
				default:0,
			},
		},
		methods: {
			openPoP(item){
				this.$emit('OpenPop',item);
			},
			reply(childID, itemID, itemName,index){
				this.$emit('Reply',childID, itemID, itemName,index)
			},
		},
	}
</script>

<style lang="scss">
	.review_item {
		margin-top: 25rpx;
	
		.item {
			margin-bottom: 25rpx;
	
			.review_tap {
				image {
					width: 75rpx;
					height: 75rpx;
					border-radius: 50%;
				}
	
				.tap_info {
					margin-left: 15rpx;
					font-size: $uni-font-size-h3;
					color: $uni-text-color-placeholder;
				}
			}
	
			.review_text {
				margin: -15rpx 0 0 75rpx;
				padding-bottom: 10rpx;
				border-bottom: 0.5rpx solid $uni-bg-color-grey;
	
				.text_content {
					font-size: $uni-font-size-h2;
					color: $uni-text-color;
				}
	
				.text_more {
					margin-top: 15rpx;
					background-color: $uni-bg-color-grey;
					font-size: $uni-font-size-h3;
					color: $uni-color-primary;
					padding: 10rpx;
				}
	
				.text_grey {
					margin-top: 25rpx;
	
					.grey_time {
						font-size: $uni-font-size-h4;
						color: $uni-text-color-placeholder;
					}
				}
	
				.grey_btn {
					.btn_icon {
						margin: 0 25rpx;
	
						image {
							margin-right: 10rpx;
							width: 35rpx;
							height: 35rpx;
						}
					}
				}
			}
		}
	}
</style>
