<template>
	<view>
		<searchBox></searchBox>
		<view class="container" style="margin-top:100rpx ;">
			<view class="product flex_only" v-for="(item,index) in list" :key="index" @click="Godetail(item.id)">
				<image :src="item.picUrl?item.picUrl[0]:'/static/none.png'" mode="aspectFill"></image>
				<view class="product_info flex_column">
					<view class="info_title">
						<text>{{item.title?item.title:''}}</text>
					</view>
					<view class="info_param">
						<text :class="item.degree?'text_active tag':''">{{item.degree?item.degree:''}}</text>
						<text :class="item.transactionMode?'tag':''">{{item.transactionMode?item.transactionMode:''}}</text>
					</view>
					<view class="info_price">
						<text>￥{{item.secondHandPrice?item.secondHandPrice:''}}</text>
						<text class="originPrice">￥{{item.originPrice?item.originPrice:''}}</text>
					</view>
					<view class="info_user">
						<image :src="item.avatarUrl?item.avatarUrl:''" mode="widthFix"></image>
						<text>{{item.address?item.address:''}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import searchBox from "../../components/home/SearchBox.vue";
	export default {
		data() {
			return {
				subcategory:'',
				page:1,
				list:[],
				totalnum:'',
			};
		},
		components:{
			searchBox,
		},
		onLoad(options) {
			this.subcategory=decodeURIComponent(options.title)
		},
		mounted() {
			this.getproduct();
		},
		methods:{
			/*物品详情*/
			Godetail(id){
				uni.navigateTo({
					url:'./detail?id=' + id
				})
			},
			/*获取数据列表*/
			getproduct(){
				var that=this
				that.$request({
					url:'/publish/GetcateProduct',
					method:"POST",
					data:{
						category:0,
						subcategory:that.subcategory,
						page:that.page,
						status:1,
						
					}
				}).then(res=>{
					console.log(res);
					if(res.data.code==200){
						that.list=that.list.concat(res.data.data)
						that.totalnum=res.data.totalnum
					}
				})
			}
		},
		onReachBottom() {
			if(this.list.length!==this.totalnum){
				this.page++
				this.getproduct();
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color:#FFFFFF;
	}
.product{
	margin-bottom: 15rpx;
	image{
		width: 270rpx;
		height: 270rpx;
		border-radius: 25rpx;
	}
	.product_info{
		margin-left: 15rpx;
		height: 270rpx;
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
.text_active{
	color: $uni-theme-color;
	border: 1rpx solid $uni-theme-color!important;
}
</style>
