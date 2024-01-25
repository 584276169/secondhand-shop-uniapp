<template>
	<view class="content"  v-show="show_agreement">
		<view class="container  agree_content" :style="{'margin-top':windowHeight}">
			<scroll-view scroll-y="true" style="height: 750rpx;padding: 15rpx;">
				<view>
					<rich-text :nodes="list"></rich-text>
				</view>
			</scroll-view>
			<view class="btn" @click="check">
				<text>确定</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				windowHeight:'',
				list:'',
			}
		},
		created() {
			var that=this
			uni.getSystemInfo({
				success(res) {
					that.windowHeight=res.windowHeight/2-325 + 'px'
				
				}
			})
			that.agreementList();
		},
		computed:{
			show_agreement(){
								return this.$modalStore.state.show_agreement;
							},
		},
		methods:{
			check:function(){
				this.$modalStore.commit('hideAgreement')
			},
			/*获取协议内容*/
			agreementList(){
				var that=this
				that.$request({
					url:'/manager/agreenmentList',
					method:'GET',
				}).then(res=>{
					console.log(res);
					if(res.data.code==0){
						that.list=res.data.data[0].agreement
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 11;
		position: fixed;
		left: 0;
		top: 0;
		padding-top: 10vh;
	}
	.agree_content{
		width: 500rpx;
		background-color: #FFFFFF;
		border-radius: 25rpx;
		padding: 25rpx;
	    margin: 0 auto;
		font-size: $uni-font-size-h3;
	}
</style>
