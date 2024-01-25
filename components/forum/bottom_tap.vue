<template>
	<view class="bottom_content flex_around" v-if="hide_input">
      <view class="" v-for="(item,index) in tap" :key="index" @click="changetap(item.id)">
		  <view class="flex tap" v-if="item.id===0" >
		  	<button type="default" open-type="share" class="flex">
				<image :src="item.icon" mode="aspectFill"></image>
				<text>{{item.title}}</text>
			</button>
		  </view>
      	<view class="flex tap" v-else>
      		<image :src="item.icon" mode="aspectFill"></image>
			<text>{{item.title}}</text>
      	</view>
      </view>
	</view>
	<view class="" v-else>
		<view class="mask" @click="hideMark">
		</view>
		<view class="bottom_input flex" :style="{bottom:keyboard+'px'}">
			<input type="text"  v-model="value" :placeholder="input_plachholder" @blur="keyboard=0" @focus="onFocus" :adjust-position="false" />
		    	<text class="bottom_btn" @click="sendValue">发送</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			hide_input:{
				type:Boolean,
				default:true,
			},
			parent_id:{
			type:Number,
			default:0,
			},
			input_plachholder:{
				type:String,
				default:'写评论....'
			}
		},
		data() {
			return {
				keyboard:'',
				value:'',
				tap: [{
						title: '转发',
						icon: '../../static/article_share.png',
						id:0,
					},
					{
						title: '评论',
						icon: '../../static/article_msg.png',
						id:1,
					},
					{
						title: '赞',
						icon: '../../static/article_like.png',
						id:2,
					},
				]
			}
		},
		methods:{
			/*监听聚焦*/
			onFocus(e){
				this.keyboard=e.detail.height
			},
			changetap(id){
					this.$emit('changemark',this.hide_input,id)
			},
			/*点击遮罩隐藏输入框*/
			hideMark(){
				this.$emit('hidemark',this.hide_input)
				this.keyboard=0;
			},
			/*发送*/
			sendValue(){
				this.$emit('sendvalue',this.value,this.parent_id);
			}
		}
	}
</script>

<style lang="scss">
	.bottom_content {
		background-color:#f5f5f5;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 25rpx;
		.tap{
			flex: 1;
			font-size:$uni-font-size-h2;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-right: 15rpx;
			}
			button{
				font-size:$uni-font-size-h2;
				background-color:#f5f5f5;
				padding: 0;
				height:40rpx;
				line-height: 40rpx;
			}
			button::after{
				border: none;
			}
		}
	}
	.bottom_input{
		background-color: #FFFFFF;
		position: fixed;
		z-index: 11;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 25rpx;
		input{
			background-color:#f7f5f5 ;
			color: $uni-text-color;
			padding: 15rpx;
			padding-left: 35rpx;
			border-radius: 45rpx;
			margin-bottom: 15rpx;
			width: 500rpx;
		}
		.bottom_btn{
			display: inline-block;
			font-size: $uni-font-size-h2;
			padding: 15rpx 25rpx;
			background:$uni-theme-linear-color;
			color: #FFFFFF;
			border-radius: 40rpx;
			margin-left: 15rpx;
			margin-bottom: 15rpx;
		}
	}
</style>
