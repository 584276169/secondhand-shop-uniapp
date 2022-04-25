<template>
	<view>
		<view class="container">
			<view class="product flex_only" v-for="(item,index) in list" :key="index" @click="Godetail(item.id)">
				<view class="flex">
					<image :src="item.picUrl?item.picUrl[0]:'/static/none.png'" mode="aspectFill"></image>
				 <view class="product_info flex_only_column_center">
				 	<view class="info_title">
				 		<text>{{item.title?item.title:''}}</text>
				 	</view>
					<view class="info_param">
						<text v-if="item.category==0" :class="item.category?'text_active tag':''">{{item.category==0?'出二手':''}}</text>
							<text v-if="item.category==1" :class="item.category?'text_active tag':''">{{item.category==1?'出租':''}}</text>
								<text v-if="item.category==2" :class="item.category?'text_active tag':''">{{item.category==2?'求二手':''}}</text>
									<text v-if="item.category==3" :class="item.category?'text_active tag':''">{{item.category==3?'求租':''}}</text>
					    <text :class="item.subcategory?'text_active tag':''">{{item.subcategory?item.subcategory:''}}</text>
					</view>
					<view class="info_price">
						<text v-show="item.secondHandPrice">￥{{item.secondHandPrice?item.secondHandPrice:''}}</text>
						<text v-show="item.originPrice" class="originPrice">￥{{item.originPrice?item.originPrice:''}}</text>
					</view>
					<view class="info_time">
						<text>{{item.createTime}}</text>
					</view>
				 </view>
				 <view class="product_controll">
				 	<view class="controll_view">
				 		<text v-if="item.status==0" class="active_status">下架</text>
				 		<text v-else>上架</text>
				 	</view>
					<view class="" style="margin-top: 25rpx;" @click.stop>
						<u-switch @change="Changestates(item.id,index)" v-model="item.status==1?true:false" activeColor="#4cd964" inactiveColor="#dd524d"></u-switch>
					</view>
					<view class="controll_delete"  @click.stop="deletepro(item.id,index)">
						<text>删除</text>
					</view>
					<view class="controll_Recommended"  @click.stop="Recommended(item.id)">
						<text>上推荐</text>
					</view>
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
				page:1,
				list:[],
				totalnum:'',
				statesControll:false,
			};
		},
		methods:{
			/*商品详情*/
			Godetail(id){
				uni.navigateTo({
					url:'./editProduct?id=' + id
				})
			},
			/*获取列表*/
			getdataList(){
				var that=this
				that.$request({
					url:'/publish/getdatList',
					method:"POST",
					data:{
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
			/*上架/下架*/
			Changestates(e,index){
				var that=this
				that.$showModal({
					content:"是否确认修改该商品状态",
					success:function(res){
						if(res.confirm){
							that.list.forEach(i=>{
								if(i.id==e){
									let states='';
									if(i.status==1){
										states=0
									}else{
										states=1
									}
								that.$request({
									url:'/publish/changeStatus',
									method:"POST",
									data:{
										status:states,
										id:e,
									}
								}).then(res=>{
									console.log(res);
									if(res.data.code==200){
										that.$set(that.list[index],"status",states);
									}
								})
								}
							})
						}
					}
				})
			},
			/*删除商品*/
			deletepro(id,index){
				var that=this
				that.$showModal({
					content:"是否删除该商品",
					success:function(res){
						if(res.confirm){
							that.$request({
								url:'/publish/deleteProduct',
								method:"POST",
								data:{
									id:id,
								}
							}).then(res=>{
								console.log(res);
								if(res.data.code==200){
									that.list.splice(index,1)
								}
							})
						}
					}
					
				})
			},
			Recommended(id){
				uni.navigateTo({
					url:'../USER/recommendation?id=' + id
				})
			}
		},
		onReachBottom() {
			if(this.list.length!==this.totalnum){
				this.page++
				this.getdataList()
			}
		},
		mounted() {
			this.getdataList();
		},
	}
</script>

<style lang="scss">
.product{
	margin-bottom: 15rpx;
	padding-bottom: 15rpx;
	border-bottom: 1rpx solid $uni-text-color-disable;
	image{
		width: 230rpx;
		height: 230rpx;
		border-radius: 25rpx;
	}
	.product_info{
		margin-left: 15rpx;
	}
	.info_time{
		font-size:$uni-font-size-h4;
		
	}
	.product_controll{
		.controll_view{
			text{
				display: inline-block;
				padding: 10rpx 20rpx ;
				background-color: $uni-color-success;
				border-radius: 30rpx;
				color: #FFFFFF;
				text-align: center;
				font-size: $uni-font-size-h3;
			}
		}
		.controll_delete{
			font-size: $uni-font-size-h2;
			margin-top: 45rpx;
			text-align: center;
			color:$uni-color-error ;
		}
		
	}
}
.text_active{
	color: $uni-theme-color;
	border: 1rpx solid $uni-theme-color!important;
}
.active_status{
	background-color:$uni-color-error!important;
}
.controll_Recommended{
	font-size: $uni-font-size-h2;
	margin-top: 45rpx;
	text-align: center;
	color:$uni-color-success;
}
</style>
