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
						title: '爱马仕',
						image:'/static/icon1.png',
						id:0,
					},
					{
						title: '香奈儿',
						image:'/static/icon2.png',
						id:1,
					},
					{
						title: '菲拉格慕',
						image:'/static/icon3.png',
						id:2,
					},
					{
						title: '卡地亚',
						image:'/static/icon4.png',
						id:3,
					},
					{
						title: 'Coach',
						image:'/static/icon5.png',
						id:4,
					},
					{
						title: 'Moschino',
						image:'/static/icon6.png',
						id:5,
					},
					{
						title: 'Mulberry',
						image:'/static/icon7.png',
						id:6,
					},
					{
						title: 'Etro',
						image:'/static/icon8.png',
						id:7,
					},
					{
						title: '蒂芙尼',
						image:'/static/icon4.png',
						id:8,
					},
					{
						title: 'Blumarine',
						image:'/static/icon3.png',
						id:9,
					},
					{
						title: 'Gucci',
						image:'/static/icon8.png',
						id:10,
					},
					{
						title: '梵克雅宝',
						image:'/static/icon2.png',
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
