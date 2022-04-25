<template>
	<view>
		<view class="containerBox request_content">
			<u-form label-width="200" labelPosition="top">
				<u-form-item  label="商品标题">
					<input type="text" v-model="list.title" disabled placeholder="请输入商品标题" />
				</u-form-item>
				<u-form-item  label="你希望推荐的持续时间为多长" label-position="top" >
					<picker mode="selector" :range="date" @change="getDate">
						<input type="text" v-model="time" placeholder="点击选择时间" disabled />
					</picker>
				</u-form-item>
			</u-form>
			<view class="btn postRequest"  @click="recommendation">
				<text>提交申请</text>
			</view>
		</view>
		<view class="containerBox request_tip flex_column">
			<text class="modul_title">什么是上推荐</text>
			<text class="neirong">用户可以将自己发布的商品申请上首页推荐模块,并且申请商品在推荐模块上显示的持续时间,以达到快速吸引流量以及引流的目的</text>
			<text class="modul_title">处理时间</text>
			<text class="neirong">当发起上推荐申请后,我们会在1到3个工作日内处理申请,必要时我们将会以电话的形式与您联系</text>
		    <text class="modul_title">条件与要求</text>
			<text class="neirong">用户提交申请后,我们将会挑选出最合适的商品进行上推荐</text>
		</view>
		<show-modal></show-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				list:{},
				date:["一天","两天","七天","十四天"],//上推荐持续时间
				time:'',
			};
		},
		onLoad(options) {
			this.id=options.id
		},
		mounted() {
			this.Getdetail();
		},
		methods:{
			/*获取持续时间*/
			getDate(e){
				console.log(e);
				let index=e.detail.value
				this.time=this.date[index]
			},
			/*商品详情*/
			Getdetail() {
				var that = this
				that.$request({
					url: '/publish/Getdetail',
					method: 'POST',
					data: {
						id: that.id,
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 200) {
						that.list = res.data.data[0]
					}
				})
			},
			/*提交申请*/
			recommendation(){
				var that=this
				that.$showModal({
					content:"是否提交申请",
					success:function(res){
						if(res.confirm){
							that.$request({
								url:'/publish/recommendation',
								method:"POST",
								data:{
									product_id:that.id,
									recommend_sustain:that.time,
								}
							}).then(res=>{
								console.log(res);
			                    if(res.data.code==0){
									uni.showToast({
										title:"申请成功",
										success() {
											setTimeout(()=>{
												uni.navigateBack({
													delta:1
												})
											},1000)
										}
									})
									
								}
							})
						}
					}
				})
			}
		},
	}
</script>

<style lang="scss">
 .request_content{
	 margin-top: 25rpx;
	 .postRequest{
	 	 margin-top: 25rpx;
	 }
 }
 
 .request_tip{
	 margin-top: 35rpx;
	 .neirong{
		 font-size: $uni-font-size-h3;
		 color: $uni-text-color-grey;
		 margin: 15rpx 0;
	 }
 }
</style>
