<template>
	<view class="content">
		<view class="" v-if="list.length==0">
			<view class="select_content">
				<u-input @blur="getValue" prefixIcon="search" placeholder="华为手机" shape="circle" v-model="value"></u-input>
				<text @click="returnBack">取消</text>
			</view>
			<view class="select_history">
				<text >历史搜索</text>
				<image  src="../../static/dustbin.png" mode="widthFix" @click="deleteall"></image>
			</view>
			<view class="history_content">
					<text v-for="(item,index) in search_product" :key="index" >{{item}}</text>
			</view>
		</view>
		<!--搜索结果-->
		<view class="product_content" v-else>
			<view class="product flex_only" v-for="(item,index) in list" :key="index" @click="Godetail(item.id)">
				<image   :src="item.picUrl?item.picUrl[0]:'/static/none.png'" mode="aspectFill"></image>
				<view class="product_info" style="padding: 15rpx;">
					<view class="info_title">
						<text>{{item.title?item.title:''}}</text>
					</view>
					<view class="info_param">
						<text v-if="item.category==0" :class="item.category?'text_active tag':''">{{item.category==0?'出二手':''}}</text>
							<text v-if="item.category==1" :class="item.category?'text_active tag':''">{{item.category==1?'出租':''}}</text>
								<text v-if="item.category==2" :class="item.category?'text_active tag':''">{{item.category==2?'求二手':''}}</text>
									<text v-if="item.category==3" :class="item.category?'text_active tag':''">{{item.category==3?'求租':''}}</text>
						<text :class="item.degree?'text_active tag':''">{{item.degree?item.degree:''}}</text>
						<text :class="item.transactionMode?'tag':''">{{item.transactionMode?item.transactionMode:''}}</text>
					</view>
					<view class="info_price">
					      <text>￥{{item.secondHandPrice?item.secondHandPrice:'0.00'}}</text>
						  <text class="originPrice">￥{{item.originPrice?item.originPrice:''}}</text>
					</view>
					<view class="info_user">
					    <image :src="item.avatarUrl" mode="widthFix"></image>
						<text>{{item.address?item.address:''}}</text>
					</view>
				</view>
			</view>
		</view>
		<show-modal></show-modal>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				value:'',
				search_product:[],
				page:1,
				totalnum:'',
				list:[],
			};
		},
		onLoad(options) {
			
		},
		onShow() {
			var that=this
			let search_product=uni.getStorage({
				key:"SEARCH_PRODUCT",
				success(res) {
				that.search_product=res.data
				}
			})
		},
		methods:{
	       /*物品详情*/
	       Godetail(id){
	       	uni.navigateTo({
	       		url:'./detail?id=' + id
	       	})
	       },
			getValue:function(e){
				this.value=e;
				this.search_product.push(e)
				uni.setStorageSync("SEARCH_PRODUCT",this.search_product);
				/*搜索商品*/
				this.searchPro(e);
			},
			/*搜索商品*/
			searchPro(){
				var that=this
				that.$request({
					url:'/publish/searchProduct',
					method:"POST",
					data:{
						value:that.value,
						page:that.page,
					}
				}).then(res=>{
					console.log(res);
					if(res.data.code==200){
						that.list=that.list.concat(res.data.data)
						that.totalnum=res.data.totalnum
					}
				})
			},
			/*清空*/
			deleteall(){
				var that=this
				if(that.search_product.length!==0){
					that.$showModal({
						content:'是否确认清空历史记录',
						confirmText:'确定',
						success:function(res){
							if(res.confirm){
							that.search_product.splice(0,that.search_product.length)
								uni.setStorage({
									key:'SEARCH_PRODUCT',
									data:that.search_product,
								})
							}
						}
					})
				}
			},
		/*返回*/
		returnBack(){
			uni.navigateBack({
				delta:1
			})
		}
		},
		onReachBottom() {
			if(this.list.length!==this.totalnum){
				this.page++
				this.searchPro();
			}
		}
	}
</script>

<style lang="scss">
	.content{
		margin: 0 15rpx;
	}
.select_content{
	display: flex;
	align-items: center;
	justify-content: space-around;
	
	padding: 25rpx 0;
	.u-input{
		background-color:#f7f5f5;
	}
	text{
		margin-left: 25rpx;
		font-size: $uni-font-size-h2;
	}
}
.select_history{
	position: relative;
	display: flex;
	align-items: center;
	text{
		font-size: $uni-font-size-h2;
		font-weight: bold;
	}
	image{
		position: absolute;
		right: 0;
		width: 40rpx;
		height: 40rpx;
	}
}
.history_content{
	margin-top: 15rpx;
	font-size: $uni-font-size-h4;
	text{
		display: inline-block;
		padding: 10rpx 25rpx;
		border: 1rpx solid $uni-bg-color-grey;
		border-radius: 35rpx;
		margin: 10rpx;
		background-color: #f7f5f5;
	}
}
.product_content {
		display: flex;
		flex-wrap: wrap;
		margin-top: 15rpx;
		.product {
			margin:15rpx;
			padding-bottom: 25rpx;
		  border-bottom: 1rpx solid $uni-border-color;
			image {
				width: 320rpx;
				height: 320rpx;
				
				border-radius: 25rpx;
			}
			.info_user{
				margin-top: 15rpx;
				display: flex;
				align-items: center;
				font-size: $uni-font-size-h4;
				color:$uni-text-color-grey;
				image{
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
	.text_active{
		color: $uni-theme-color;
		border: 1rpx solid $uni-theme-color!important;
	}
</style>
