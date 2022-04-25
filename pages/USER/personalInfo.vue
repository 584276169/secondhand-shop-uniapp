<template>
	<view class="">
		 <u-notice-bar :text="text1" mode="closable"></u-notice-bar>
		<view class="container">
			<u--form labelWidth="200rpx" :labelStyle="labelStyle">
				<u-form-item  label="头像" borderBottom>
				    <view class="formitem">
				    	<image :src="list.avatarUrl" mode="widthFix"></image>
				    </view>
				</u-form-item>
				<u-form-item  label="昵称" borderBottom>
				    <view class="formitem" @click="updatenickName">
				    	<text>{{list.nickName}}</text>
				    </view>
				</u-form-item>
				<u-form-item  label="性别" borderBottom>
				    <view class="formitem">
						<picker mode="selector" @change="getsex" :range="sexArray">
								<input disabled border="none" placeholder="请选择" clearable
									v-model="list.sex"></input>
						</picker>
				    </view>
				</u-form-item>
				<u-form-item  label="城市" borderBottom>
				    <view class="formitem">
				    	<picker mode="region" @change="getcity">
				    			<input disabled border="none" placeholder="请选择" clearable
				    				v-model="list.city"></input>
				    	</picker>
				    </view>
				</u-form-item>
				</u--form>
		</view>
	  <view class="container" style="margin-top: 40rpx;">
		  <view class="modul_title">
		  	<text>绑定信息</text>
		  </view>
	  	<u--form labelWidth="200rpx" :labelStyle="labelStyle">
			<u-form-item  label="微信号" borderBottom @click="updateWechat">
			    <view class="formitem">
			    	<text v-if="list.wechatNumber">{{list.wechatNumber}}</text>
			    	<text v-else>未设置</text>
			    </view>
			</u-form-item>
			<u-form-item  label="手机号" borderBottom>
			    <view class="formitem" @click="updatePhone">
			     <text v-if="list.phone">{{list.phone}}</text>
				 <text v-else>未设置</text>
			    </view>
			</u-form-item>
			<u-form-item  label="邮箱" borderBottom @click="updateMail">
			    <view class="formitem">
			    	<text v-if="list.mail">{{list.mail}}</text>
			    	<text v-else>未设置</text>
			    </view>
			</u-form-item>
			</u--form>
	  </view>
	  <updatevalue></updatevalue>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text1:'为了与客户更方便地沟通以及联系,请及时绑定微信号,以便客户能添加您的微信',
				list:{},
				labelStyle://表单style
				{             
					'font-weight': '600',
					'font-size': '30rpx',
				},
				sexArray:[
					"男","女"
				]
			}
		},
		mounted() {
			this.getuser();
		},
		methods:{
			/*获取个人信息*/
			getuser(){
				var that=this
				that.$request({
					url:'/User/getuserinfo',
					method:"POST",
				}).then(res=>{
					console.log(res);
					if(res.data.code==200){
						that.list=res.data.data
					}
				})
			},
			/*获取性别*/
			getsex(e){
				let value=e.detail.value
				if(value==0){
					this.list.sex="男"
				}else{
					this.list.sex="女"
				}
				this.updateInfo();
			},
			/*获取城市*/
			getcity(e){
				let value=e.detail.value
				this.list.city=value.join('');
				this.updateInfo();
			},
			/*更新手机号*/
			updatePhone(){
				var that=this
				that.$showUpdate({
					content:"修改手机号",
					success:function(res){
						if(res.confirm){
							that.list.phone=res.value
							that.updateInfo();
						}
					}
				})
			},
			/*更新邮箱*/
			updateMail(){
				var that=this
				that.$showUpdate({
					content:"修改邮箱",
					success:function(res){
						if(res.confirm){
							that.list.mail=res.value
							that.updateInfo();
						}
					}
				})
			},
			/*更新微信号*/
			updateWechat(){
				var that=this
				that.$showUpdate({
					content:"修改微信号",
					success:function(res){
						if(res.confirm){
							that.list.wechatNumber=res.value
							that.updateInfo();
						}
					}
				})
			},
			/*更新用户名*/
			updatenickName(){
				var that=this
				that.$showUpdate({
					content:"修改昵称",
					success:function(res){
						if(res.confirm){
							that.list.nickName=res.value
							that.updateInfo();
							uni.setStorageSync("NICKNAME",res.value)
						}
					}
				})
			},
			/*更新信息接口*/
			updateInfo(){
				var that=this
				that.$request({
					url:'/User/updateInfo',
					method:"POST",
					data:{
						phone:that.list.phone,
						mail:that.list.mail,
						sex:that.list.sex,
						nickName:that.list.nickName,
						city:that.list.city,
						wechatNumber:that.list.wechatNumber,
					}
				}).then(res=>{
					console.log(res);
					that.getuser()
				})
			},
		}
	}
</script>

<style lang="scss">
  .container{
	  image{
		  width: 80rpx;
		  height: 80rpx;
		  border-radius: 50%;
	  }
	.formitem{
		text-align: right;
	}
  }
</style>
