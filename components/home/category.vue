<template>
	<view class="containerBox" style="margin-top: 100rpx;">
       <view class="cate_content">
       	<view class="cate_tap" v-for="(item,index) in list" :key="index" @click="Gocate(item.title)">
       		<image :src="item.image" mode="widthFix"></image>
			<text>{{item.title}}</text>
       	</view>
       </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						title: '家具',
						image:'/static/furniture.png',
						id:0,
					},
					{
						title: '衣服',
						image:'/static/clothes.png',
						id:1,
					},
					{
						title: '鞋子',
						image:'/static/shoes.png',
						id:2,
					},
					{
						title: '书籍',
						image:'/static/book.png',
						id:3,
					},
					{
						title: '手机',
						image:'/static/phone.png',
						id:4,
					},
					{
						title: '药品',
						image:'/static/drugs.png',
						id:5,
					},
					{
						title: '电子产品',
						image:'/static/electronic.png',
						id:6,
					},
					{
						title: '运动',
						image:'/static/sport.png',
						id:7,
					},
					{
						title: '美妆',
						image:'/static/Beauty.png',
						id:8,
					},
					{
						title: '厨具',
						image:'/static/Kitchenware.png',
						id:9,
					},
					{
						title: '健身',
						image:'/static/Bodybuilding.png',
						id:10,
					},
					{
						title: '乐器',
						image:'/static/Musical.png',
						id:11,
					}
				]
			}
		},
		methods:{
			Gocate:function(title){
				uni.navigateTo({
					url:'./kinds?title=' + title
				})
			}
		}
	}
</script>

<style lang="scss">
	.cate_content{
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		.cate_tap{
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $uni-font-size-h4;
			width: 100rpx;
			margin-bottom: 8rpx;
			image{
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
</style>
