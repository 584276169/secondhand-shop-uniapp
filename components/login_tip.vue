<template>
	<view class="login_content" v-if="show">
		<view class="login_tip"  :style="{'margin-top':windowHeight}">
			<view class="tip_top">
				<text>{{content}}</text>
			</view>
			<view class="tip_btn">
				<view class="btn_reject" @click.stop="clickBtn('cancel')">
					<text>{{cancelText}}</text>
				</view>
				<view class="btn" @click.stop="clickBtn('confirm')">
					<text>{{confirmText}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				windowHeight:'',
			}
		},
		created() {
			var that=this
			uni.getSystemInfo({
				success(res) {
					that.windowHeight=res.windowHeight/2-156 + 'px'
				
				}
			})
		},
		computed:{
			show(){
								return this.$modalStore.state.show;
							},
			content() {
				return this.$modalStore.state.content;
			},
			cancelText(){
				return this.$modalStore.state.cancelText
			},
			confirmText(){
				return this.$modalStore.state.confirmText
			},
			
		},
		methods: {
			clickBtn(res) {
				this.$modalStore.commit('hideModal')
				this.$modalStore.commit('success', res)
			}
		}

	}
</script>

<style lang="scss"  scoped>

	.login_content {
	        width: 100%;
	        height: 100vh;
	        background: rgba(0, 0, 0, 0.5);
	        z-index: 11;
	        position: fixed;
	        left: 0;
	        top: 0;
	        padding-top: 10vh;
	}

	.login_tip {
		width: 600rpx;
		background-color: #FFFFFF;
		border-radius: 25rpx;
		padding: 15rpx;
				margin: 0 auto;
	}

	.tip_top {
		text-align: center;
		line-height: 150rpx;
		font-size: $uni-font-size-h1;
		font-weight: bold;
		font-family: $uni-font-family;
	}

	.tip_btn {
		display: flex;
		justify-content: space-around;
		margin-top: 25rpx;
		padding-bottom: 35rpx;
	}

	.btn {
		padding: 15rpx 75rpx;
		border: 2rpx solid $uni-bg-color-grey;
		background: $uni-theme-linear-color;
		line-height: 45rpx;
		border-radius: 55rpx;
		font-family: $uni-font-family;
		font-size: $uni-font-size-h1;
		color: #FFFFFF;
	}

	.btn_reject {
		padding: 15rpx 75rpx;
		border: 2rpx solid $uni-bg-color-grey;
		line-height: 45rpx;
		border-radius: 55rpx;
		font-family: $uni-font-family;
		font-size: $uni-font-size-h1;
		color: #FFFFFF;
		background-color: $uni-text-color-placeholder !important;
	}
</style>
