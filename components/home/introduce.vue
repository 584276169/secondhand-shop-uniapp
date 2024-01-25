<template>
	<view class="containerBox introBox">
		<view class="intro_title">
			<text>逛逛二手·省心快卖</text>
		</view>
		<view class="flex_around" style="margin-top: 15rpx;">
			<view class="intro_product flex" v-for="(item,index) in recommend" :key="index" @click="GOdetail(item.id)">
				<view class="flex_colum">
					<text class="product_top">{{item.tradeName}}</text>
					<text class="intro_price">￥{{item.secondHandPrice}}</text>
				</view>
				<image :src="item.picUrl[0]" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	props:{
		recommend:{
			type:Array,
			default:[],
		}
	},
	data() {
		return {
			
		}
	},
	methods:{
		GOdetail(id){
			uni.navigateTo({
				url:'./detail?id=' + id,
			})
		}
	}
}
</script>

<style lang="scss">
	.introBox{
		margin-top: 15rpx;
		.intro_title{
			font-size: $uni-font-size-h1;
			font-family: $uni-font-family;
			font-weight: bold;
		}
		.intro_product{
			image{
				margin-left: 15rpx;
				border-radius: 25rpx;
				width: 130rpx;
				height: 130rpx;
			}
			.product_top{
				width: 150rpx;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				/* 这里是超出几行省略 */
				overflow: hidden;
				font-size: $uni-font-size-h3;
				color:$uni-color-paragraph;
			}
			.intro_price{
				font-size: $uni-font-size-h1;
				font-weight: bold;
			}
		}
	}
</style>
