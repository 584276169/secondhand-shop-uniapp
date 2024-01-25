<template>
	<view class="content">
		<!--出二手-->
		<view class="container">
			<u--form labelWidth="200rpx" :labelStyle="labelStyle" :model="form"  ref="ProForms">
				<u-form-item label="押金" borderBottom>
					<u-radio-group @change="getchange" activeColor="#E31D1C">
						<u-radio   label="有押金" name="有押金"></u-radio>
						<u-radio  label="无押金" name="无押金"></u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="商品类型" borderBottom required>

					<input @click="showpick=!showpick" disabled border="none" placeholder="请选择商品类型" clearable
						v-model="form.subcategory"></input>

					<u-picker  :columns="subcategory" :show="showpick"
				         @confirm="pickconfirm" @close="showpick=!showpick"
						@cancel="showpick=!showpick" confirmColor="#E31D1C" :closeOnClickOverlay="true">
					</u-picker>
				</u-form-item>
				<u-form-item label="价格" borderBottom>
					<input type="text" value="" placeholder="例如1000/月" v-model="form.price" />
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
						name="image" accept="image" multiple :maxCount="3"></u-upload>
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
				fileList: [], //前端存储的图片文件列表
				imageList: [], //后端返回的图片路径
				form: {
					address: '',
					phone: '',
					remark: '',
					title: '',
					category: '',
					subcategory: '',
					status:'',
					deposit:'',
					price:'',
				},
				labelStyle://表单style
				{             
					'font-weight': '600',
					'font-size': '30rpx',
				},
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
		},
		mounted() {
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
			/*选中是否有押金*/
			getchange: function(e) {
				this.form.deposit=e
			
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
						parent:2,
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
				if (that.postcheck.length !== 0) {
					that.$showModal({
						content:'是否确认发布信息',
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
													url: '/publish/pubrentout',
													method: "POST",
													data: {
														address: that.form.address,
														phone: that.form.phone,
														remark: that.form.remark,
														title: that.form.title,
														picUrl: JSON.stringify(that.imageList),
														category:1,
														subcategory:that.form.subcategory,
														status:that.form.status,
														deposit:that.form.deposit,
														price:that.form.price,
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
