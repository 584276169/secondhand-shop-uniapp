<template>
	<view class="container bottom">
		<view class="flex_between">
			<view class="bottom_left flex">
				<view class="flex_column_center" @click="collected">
					<image :src="collect==false?'../../static/collect.png':'../../static/collected.png'" mode="widthFix"></image>
					<text>收藏</text>
				</view>
			</view>
			<view class="bottom_right">
				<view class="flex">
					<text class="copyWechat" @click="Gonext(2)">复制微信号</text>
					<text class="talktalk" @click="Gonext(1)">咨询卖家</text>
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
			collect:{
				type:Boolean,
			}
		},
		methods:{
			Gonext(id){
				this.$emit("goNext",id);
			},
			collected(){
				this.$emit("getCollect");
			},
		}
	}
</script>

<style lang="scss">
	.bottom{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		.bottom_left{
			font-size: $uni-font-size-h3;
			.flex_column_center{
				margin:0 15rpx;
			}
			image{
				width: 50rpx;
				height: 50rpx;
			}
		}
		.bottom_right{
			text{
				display: inline-block;
				padding: 15rpx 55rpx;
				background-color: $uni-theme-color;
				color: #FFFFFF;
				font-size: $uni-font-size-h2;
				border-radius: 35rpx;
				margin-left: 15rpx;
			}
			.talktalk{
				background: #FF8000;
			}
			.copyWechat{
				background:$uni-theme-linear-color;
			}
		}
	}
</style>
