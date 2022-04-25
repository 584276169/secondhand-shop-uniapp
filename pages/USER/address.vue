<template>
	<view >
		<view class="container flex address_content"  v-for="(item,index) in list" :key="index" @click="confirmaddress(item.id)">
				<image class="logo" src="../../static/address.png" mode="widthFix"></image>
			<view class="address_info">
				<view class="name">
					<text>{{item.name}}{{item.phone}}</text>
				</view>
				<view class="province">
					<text>{{item.province}}{{item.city}}{{item.area}}</text>
				</view>
				<view class="detail">
					<text>{{item.detailAddress}}</text>
				</view>
			</view>
			<image @click="editor(item.id)" class="logo1" src="../../static/editor.png" mode="widthFix"></image>
		</view>
		<view class="btn" @click="add" style="margin-top: 100rpx;">
			<text>添加地址</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
			};
		},
		methods:{
			/*添加地址*/
			add(){
				uni.navigateTo({
					url:'./addAddress'
				})
			},
			/*获取地址列表*/
			getaddress:function(){
				var that=this
				that.$request({
					url:'/User/getAddress',
					method:"get",
				}).then(res=>{
					if(res.data.code==200){
						that.list=res.data.data
					}
				})
			},
			/*编辑*/
			editor:function(id){
				uni.navigateTo({
					url:"./editorAddress?id=" + id
				})
			},
			/*选中地址*/
			
			confirmaddress:function(id){
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				console.log(prevPage);
				if(prevPage.route=="pages/PUBLISH/publish"||"pages/PUBLISH/renout"||"pages/PUBLISH/editorProduct"){
					let form={}
					this.list.forEach(i=>{
						if(i.id==id){
							form=i
						}
					})
				prevPage.$vm.otherFun(form);
				uni.navigateBack({
					delta:1
				})
				}
			},
		},
		mounted() {
			this.getaddress();
		}
	}
</script>

<style lang="scss">
	.address_content{
		border-bottom: 2rpx solid $uni-bg-color-grey;
	}
	.logo{
		width: 60rpx;
		height: 60rpx;
	}
	.logo1{
		width: 40rpx;
			height:40rpx;
		}
	
  .address_info{
	  margin:0 25rpx;
	  width: 530rpx;
	  .name{
		  font-size:$uni-font-size-h2;
		  margin-bottom: 15rpx;
	  }
	  .province{
		  font-size:$uni-font-size-h3;
		  margin-bottom: 15rpx;
	  }
	  .detail{
		  font-size:$uni-font-size-h3;
		  margin-bottom: 15rpx;
	  }
  }
</style>
