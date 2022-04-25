<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
	
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import url("/components/animate.css");
	/*每个页面公共css */
	page{
		background-color: #FAFAFA;
	}
	.container{
		padding: 25rpx;
		background-color: #FFFFFF;
		overflow: hidden;
	}
	.containerBox{
		padding: 25rpx;
		background-color: #FFFFFF;
		margin: 0 15rpx;
		border-radius: 38rpx;
	}
	.flex_around{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.flex_between{
		display: flex;
			flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}
	.flex_wrap{
		display: flex;
			flex-wrap: wrap;
		align-items: center;
		flex-wrap: wrap;
	}
	.flex{
		display: flex;
			flex-wrap: wrap;
		align-items: center;
	}
	.flex_only{
		display: flex;
			flex-wrap: wrap;
	}
	.flex_only_column_center{
		display: flex;
			flex-wrap: wrap;
		flex-direction: column;
		justify-content: center;
	}
	.flex_column{
		display: flex;
			flex-wrap: wrap;
		flex-direction: column;
	}
	.flex_column_center{
		display: flex;
			flex-wrap: wrap;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btn{
		margin: 0 30rpx;
		text-align: center;
		font-size: $uni-font-size-h1;
		background: $uni-theme-linear-color;
		border-radius: 45rpx;
		padding: 25rpx;
		color: #FFFFFF;
	}
	.shm_button_small{
		font-size: $uni-font-size-h3;
		background-color: $uni-color-primary;
        color: #FFFFFF;
		padding: 15rpx 25rpx;
		text-align: center;
		border-radius: 15rpx;
	}
	.shm_button_small_ThemeColor{
		font-size: $uni-font-size-h3;
		background: $uni-theme-linear-color;
	    color: #FFFFFF;
		padding: 15rpx 25rpx;
		text-align: center;
		border-radius: 15rpx;
	}
	/*商品列表*/
	.info_title {
		font-size: $uni-font-size-h2;
		margin-top: 10rpx;
		width: 320rpx;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* 这里是超出几行省略 */
		overflow: hidden;
	}
	.info_param{
		margin-top: 10rpx;
		.tag{
			display: inline-block;
			padding: 5rpx 15rpx;
			border-radius: 25rpx;
			border: 2rpx solid $uni-border-color;
			font-size: $uni-font-size-h4;
			margin: 5rpx;
		}
	}
	.info_price{
		margin-top: 10rpx;
		color: $uni-theme-color;
		font-size: $uni-font-size-h1;
	}
	.originPrice{
		font-size: $uni-font-size-h4;
		color:$uni-text-color-grey;
		margin-left: 10rpx;
		text-decoration: line-through;
	}
	.modul_title{
		display: inline-block;
		font-size: $uni-font-size-h1;
		padding: 0 15rpx;
		border-left: 6rpx solid $uni-theme-color;
	}
	.mask{
		  width: 100%;
		  background: rgba(0, 0, 0, 0.3);
		  position: fixed;
		  top: 0;
		  height: 100%;
		  z-index:10;
	}
	.float_right{
		float: right;
	}
</style>
