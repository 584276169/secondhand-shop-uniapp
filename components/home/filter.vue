<template>
	<view class="filte_content">
			 <view class="flex_around">
			 	<view :class="[tap==index?'active':'']" v-for="(item,index) in list" :key="index" @click="Gotap(item.id)">
			 		{{item.title}}
			 	</view>
			 </view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				tap:0,
				list:[
					{
						id:0,
					  title:'出二手'	
					},{
						id:1,
					  title:'出租'	
					},
					{
						id:2,
					  title:'求二手'	
					},
					{
						id:3,
					  title:'求租'	
					},
				]
			}
		},
		methods:{
			Gotap:function(id){
				uni.pageScrollTo({
					scrollTop:450,
				})
				this.tap=id
				this.$emit("changeTap",id);
			}
		}
	}
</script>

<style lang="scss">
	.filte_content{
		background-color: $uni-page-color;
		padding: 15rpx;
		font-size: $uni-font-size-h1;
		height: 80rpx;
		line-height: 80rpx;
	}
	.active{
		font-weight: bold;
		color: $uni-theme-color;
		border-bottom: 6rpx solid $uni-theme-color;
	}
</style>

