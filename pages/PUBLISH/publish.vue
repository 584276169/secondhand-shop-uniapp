<template>
	<view class="content">
		<!--出二手-->
		<view class="container">
			<u--form labelWidth="200rpx" :labelStyle="labelStyle" :model="form" :rules="rules" ref="ProForm">
				<u-form-item label="交易方式" borderBottom>
					<u-checkbox-group iconPlacement="left" class="flex_around" @change="gettransaction">
						<u-checkbox name="面交" label="面交" shape="circle" activeColor="#E31D1C"></u-checkbox>
						<u-checkbox name="邮寄" label="邮寄" shape="circle" activeColor="#E31D1C"></u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="商品类型" borderBottom required>

					<input @click="showpick=!showpick" disabled border="none" placeholder="请选择商品类型" clearable
						v-model="form.subcategory"></input>

					<u-picker  ref="uPicker" :columns="subcategory" :show="showpick"
		                          @confirm="pickconfirm" @close="showpick=!showpick"
						@cancel="showpick=!showpick" confirmColor="#E31D1C" :closeOnClickOverlay="true">
					</u-picker>
				</u-form-item>
				<u-form-item label="标题" borderBottom>
					<input type="text" value="" placeholder="请输入您要发布的信息标题" v-model="form.title" />
				</u-form-item>
				<u-form-item label="地址" borderBottom>
					<view class="flex" @click="Goaddress">
						<input v-model="form.address" style="width: 440rpx;" type="text" value="" placeholder="请选择地址"
							disabled />
						<image  src="../../static/addressBook.png" mode="widthFix"
							style="width: 60rpx;height: 60rpx;"></image>
					</view>
				</u-form-item>
				<u-form-item label="手机号" borderBottom>
					<input v-model="form.phone" type="text" value="" placeholder="请输入您的手机号码" />
				</u-form-item>
				<u-form-item label="商品信息" borderBottom class="info_mess" required>
					<u--form labelPosition="top" labelWidth="200rpx">
						<u-form-item label="商品名称">
							<input class="input_text" type="text" v-model="form.tradeName" placeholder="请输入您的商品名称" />
						</u-form-item>
						<u-form-item label="二手价格">
							<input class="input_text" type="text" v-model="form.secondHandPrice"
								placeholder="请输入二手价格" />
						</u-form-item>
						<u-form-item label="商品原价">
							<input class="input_text" type="text" v-model="form.originPrice" placeholder="请输入原价" />
						</u-form-item>
					</u--form>
				</u-form-item>
				<u-form-item label="商品成色" borderBottom required prop="condition">
					<picker mode="selector" @change="getchange" :range="condition">
						<view class="">
							<input disabled border="none" placeholder="请选择商品成色" clearable
								v-model="form.condition"></input>
						</view>
					</picker>
				</u-form-item>
				<u-form-item label="备注" borderBottom>
					<u--textarea placeholder="请输入内容" v-model="form.remark" count maxlength="50"></u--textarea>
				</u-form-item>
				<u-form-item label="商品状态" borderBottom>
					<picker mode="selector" @change="getstates" :range="states">
						<view class="">
							<input disabled border="none" placeholder="请选择商品状态" clearable
								v-model="stats"></input>
						</view>
					</picker>
				</u-form-item>
				<u-form-item label="商品图片" borderBottom required>
					<u-upload
					 uploadIconColor="#E31D1C"
					  :fileList="fileList"
					   @afterRead="afterRead"
						@delete="deletePic"
						name="image"
						 accept="image"
						  multiple 
						  :maxCount="3"
						  ></u-upload>
				</u-form-item>
			</u--form>
			<view class="flex" style="margin-top: 25rpx;">
				<u-checkbox-group iconPlacement="left" @change="postControll">
					<u-checkbox name="1" label="我已经阅读并且同意" shape="circle" activeColor="#E31D1C"></u-checkbox>
				</u-checkbox-group>
				<text @click="showAgree" style="color: #E31D1C;">《逛逛平台协议》</text>
			</view>
			<view class="btn" style="margin-top: 25rpx;" @click="finish">
				<text>发布</text>
			</view>
		</view>
		<agreement></agreement>
		<show-modal></show-modal>
	</view>
</template>

<script>
	import {
		port
	} from '../../config/portConfig.js';
	export default {
		data() {
			return {
				showpick: false,
				rules://表单验证
				{
					condition: [{
						required: true,
						message: '请选择商品成色',
						trigger: ['blur', 'change'],

					}],
				},
				fileList: [], //前端存储的图片文件列表
				imageList: [], //后端返回的图片路径
				form: {
					address: '',
					phone: '',
					condition: '',
					tradeName: '',
					secondHandPrice: '',
					originPrice: '',
					remark: '',
					title: '',
					transactionMode:'',
					category: '',
					subcategory: '',
					status:'',
				},
				id: '', //表单类型
				labelStyle://表单style
				{             
					'font-weight': '600',
					'font-size': '30rpx',
				},
				condition: [], //成色列表
				category: [], //商品类型
				subcategory: [], //商品子类型
				postcheck: [], //协议选择
				states://商品状态
				[
					'下架','上架'
				],
				stats:'',
			}
		},
		onLoad(options) {
			var that = this
			that.id = options.id
		},
		mounted() {
			this.getcondition();
			this.getcategory();
		},
		methods: {
			/*确定类型*/
			pickconfirm: function(e) {
				console.log(e);
				this.showpick = !this.showpick
				this.form.subcategory = e.value[0]
			},
			/*同意协议*/
			postControll: function(val) {
				this.postcheck = val
			},
			/*选中交易方式*/
			gettransaction: function(val) {
				if(val.length==2){
					this.form.transactionMode=2
				}else if(val[0]=="面交"){
					this.form.transactionMode=0
				}else{
					this.form.transactionMode=1
				}
			},
			/*跳转地址页*/
			Goaddress: function() {
				uni.navigateTo({
					url: '../USER/address'
				})
			},
			/*选中地址*/
			otherFun: function(form) {
				console.log(form);
				this.form.address = form.province + form.city + form.area
				this.form.phone = form.phone
			},
			/*获取成色*/
			getcondition: function() {
				var that = this
				that.$request({
					url: '/publish/getcondition',
					method: "get",
				}).then(res => {
					if (res.data.code == 200) {
						res.data.data.forEach(i => {
							that.condition.push(i.condition)
						})
					}
				}).catch(err => {
					console.log(err);
				})

			},
			/*选中成色*/
			getchange: function(e) {
				let index = e.detail.value
				this.form.condition = this.condition[index]
			},
			/*选中状态*/
			getstates:function(e){
				let index = e.detail.value
				console.log(e);
				if(index==0){
					this.form.status=0
					this.stats="下架"
				}else{
					this.form.status=1
				    this.stats="上架"
				}
			},
			/*获取类型*/
			getcategory: function() {
				var that = this
				that.$request({
					url: '/publish/getcategory',
					method: "get",
					data:{
						parent:1,
					}
				}).then(res => {
					if (res.data.code == 200) {
						console.log(res);
						let arr=res.data.data.map(i=>{
							return i.title
						})
						that.subcategory.push(arr)
					}
				})
			},
			/*发布*/
			finish: function() {
				var that = this
				that.$refs.ProForm.validate().then(res => {
					if (that.postcheck.length !== 0) {
						that.$showModal({
							content:'是否确认发布商品',
							cancelText:'取消',
							confirmText:'确定',
							success:function(res){
								if(res.confirm){
									that.fileList.forEach((i, y) => {
										uni.uploadFile({
											url: port + '/publish/uploadFile',
											filePath: i.thumb,
											name: 'file',
											success(res) {
												let result = JSON.parse(res.data);
												that.imageList.push(result.url);
												if (that.imageList.length == that.fileList.length) {
													that.$request({
														url: '/publish/pubproduct',
														method: "POST",
														data: {
															address: that.form.address,
															phone: that.form.phone,
															degree: that.form.condition,
															tradeName: that.form.tradeName,
															secondHandPrice: that.form.secondHandPrice,
															originPrice: that.form.originPrice,
															remark: that.form.remark,
															title: that.form.title,
															transactionMode: that.form.transactionMode,
															picUrl: JSON.stringify(that.imageList),
															category:0,
															subcategory:that.form.subcategory,
															status:that.form.status,
														}
													}).then(res => {
														if (res.data.code == 200) {
															uni.showToast({
																title: res.data.msg,
																duration: 800
															})
															setTimeout(() => {
																uni.navigateBack({
																	delta: 1
																})
															}, 1200)
														}
													})
												}
											}
										})
									})
								}
							}
						})
					} else {
						uni.showToast({
							title: "请勾选协议",
							duration: 800
				
						})
					}
				})
			},
			// 删除图片
			deletePic(file, lists, name) {
				this.fileList.splice(lists, 1)
			},

			/*添加图片*/
			afterRead: function(file, lists, name) {
				this.fileList = this.fileList.concat(file.file)
			},
			/*显示协议*/
			showAgree:function(){
				this.$showAgreement();
			}

		}
	}
</script>

<style lang="scss">
	.u-checkbox {}

	.input_text {
		border: 2rpx solid #eee;
		border-radius: 25rpx;
		padding-left: 15rpx;
		height: 70rpx;
		font-size: $uni-font-size-h2;
	}
</style>
