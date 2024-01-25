<template>
	<view>
		<view class="container">
			<u--form :model="form" labelWidth="200rpx" :labelStyle="labelStyle" :rules="rules" ref="uForm">
				<u-form-item prop="name" label="收货人姓名" borderBottom required>
					<input border="none" placeholder="名字" clearable v-model="form.name"></input>
				</u-form-item>
				<u-form-item prop="phone" label="手机号码" borderBottom required>
					<input border="none" placeholder="手机号" clearable v-model="form.phone"></input>
				</u-form-item>
				<u-form-item prop="province" label="所在地区" borderBottom required>
					<picker mode="region" @change="getchange">
						<view class="">
							<input :value="form.province+form.city+form.area" disabled border="none"
								placeholder="省,市,区,街道" clearable></input>
						</view>
					</picker>
				</u-form-item>
				<u-form-item prop="detailAddress" label="详细地址" borderBottom required>
					<textarea value="" placeholder="小区楼栋/乡村名称" clearable shape="circle" v-model="form.detailAddress" />
				</u-form-item>
				<u-form-item label="邮编" borderBottom>
					<input border="none" placeholder="邮政编码" clearable shape="circle" v-model="form.zipCode"></input>
				</u-form-item>
				<u-form-item>
					<view class="btn" @click="postAddress">
						<text>保存</text>
					</view>
				</u-form-item>
			</u--form>
		</view>
		<!--位置选择弹窗-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelStyle: {
					'font-weight': '600',
					'font-size': '30rpx',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change'],

					}],
					phone: [{
						required: true,
						message: '请输入手机号',
						trigger: ['blur', 'change'],

					}],
					province: [{
						required: true,
						message: '请选择地区',
						trigger: ['blur', 'change'],

					}],
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change'],

					}],
				},
				form: {
					name: '',
					phone: '',
					province: '',
					city: '',
					area: '',
					detailAddress: '',
					zipCode: '',
				},
			}
		},
		methods: {
			getchange: function(e) {
				let info = e.detail.value
				this.form.province = info[0]
				this.form.city = info[1]
				this.form.area = info[2]
			},
			/*提交地址*/
			postAddress: function() {
				var that = this
				that.$refs.uForm.validate().then(res => {
					that.$request({
						url: '/User/addAddress',
						method: "POST",
						data: {
							name: that.form.name,
							phone: that.form.phone,
							province: that.form.province,
							city: that.form.city,
							area: that.form.area,
							detailAddress: that.form.detailAddress,
							zipCode: that.form.zipCode,
						}
					}).then(p=> {
						if(p.data.code==200){
						    uni.showToast({
						    	title:p.data.msg,
								duration:800
						    })
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							},900)
						})
						}
					})
				}).catch(err => {
					console.log(err);
				})

			}
		}
	}
</script>

<style lang="scss">
	.container {
		input {
			background-color: $uni-page-color;
			border-radius: 30rpx;
			height: 40rpx;
			padding: 20rpx;
			font-size: $uni-font-size-h2;
		}

		textarea {
			background-color: $uni-page-color;
			border-radius: 30rpx;
			line-height: 20rpx;
			padding: 20rpx;
			font-size: $uni-font-size-h2;
			width: 450rpx;
		}
	}
</style>
