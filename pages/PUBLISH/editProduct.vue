<template>
	<view class="content">
		<!--出二手-->
		<view class="container">
			<u--form labelWidth="200rpx" :labelStyle="labelStyle"   ref="ProForm">
				<u-form-item label="交易方式" borderBottom v-if="list.category==0">
					<u-checkbox-group iconPlacement="left" v-model="transitionMode" class="flex_around" @change="gettransaction">
						<u-checkbox name="0" label="面交" shape="circle" activeColor="#E31D1C"></u-checkbox>
						<u-checkbox name="1" label="邮寄" shape="circle" activeColor="#E31D1C"></u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="押金" borderBottom  v-if="list.category==1">
					<u-radio-group  activeColor="#E31D1C" v-model="list.deposit">
						<u-radio   label="有押金" name="有押金"></u-radio>
						<u-radio  label="无押金" name="无押金"></u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="商品类型" borderBottom required>

					<input disabled border="none" placeholder="请选择商品类型" clearable
						v-model="list.subcategory"></input>
				</u-form-item>
				<u-form-item label="价格" borderBottom v-if="list.category==1">
					<input type="text" value="" v-model="list.price"  />
				</u-form-item>
				<u-form-item label="标题" borderBottom>
					<input type="text" value="" placeholder="请输入您要发布的信息标题" v-model="list.title" />
				</u-form-item>
				<u-form-item label="地址" borderBottom>
					<view class="flex">
						<input v-model="list.address" style="width: 440rpx;" type="text" value="" placeholder="请选择地址"
							disabled />
						<image @click="Goaddress" src="../../static/addressBook.png" mode="widthFix"
							style="width: 60rpx;height: 60rpx;"></image>
					</view>
				</u-form-item>
				<u-form-item label="手机号" borderBottom>
					<input v-model="list.phone" type="text" value="" placeholder="请输入您的手机号码" />
				</u-form-item>
				<u-form-item label="商品信息" borderBottom class="info_mess" required v-if="list.category==0">
					<u--form labelPosition="top" labelWidth="200rpx">
						<u-form-item label="商品名称">
							<input class="input_text" type="text" v-model="list.tradeName" placeholder="请输入您的商品名称" />
						</u-form-item>
						<u-form-item label="二手价格">
							<input class="input_text" type="text" v-model="list.secondHandPrice"
								placeholder="请输入二手价格" />
						</u-form-item>
						<u-form-item label="商品原价">
							<input class="input_text" type="text" v-model="list.originPrice" placeholder="请输入原价" />
						</u-form-item>
					</u--form>
				</u-form-item>
				<u-form-item label="商品成色" borderBottom required prop="condition" v-if="list.category==0">
					<picker mode="selector" @change="getchange" :range="condition">
						<view class="">
							<input disabled border="none" placeholder="请选择商品成色" clearable
								v-model="list.degree"></input>
						</view>
					</picker>
				</u-form-item>
				<u-form-item label="备注" borderBottom>
					<u--textarea placeholder="请输入内容" v-model="list.remark" count maxlength="50"></u--textarea>
				</u-form-item>
				<u-form-item label="商品状态" borderBottom>
					<picker mode="selector" @change="getstates" :range="states">
						<view class="">
							<input v-if="list.status===0" disabled border="none" placeholder="请选择商品状态" clearable
								value="下架"></input>
								<input v-else disabled border="none" placeholder="请选择商品状态" clearable
									value="上架"></input>
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
			<view class="btn" style="margin-top: 25rpx;" @click="finish">
				<text>完成</text>
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
			labelStyle://表单style
			{             
				'font-weight': '600',
				'font-size': '30rpx',
			},
			id:"",
			list:{},
			states://商品状态
			[
				'下架','上架'
			],
			fileList:[],//图片数组
			imageList:[],//返回来的后端图片路径
			condition:[],//成色数组
			transitionMode:[],//选中的交易方式
			
		}
	},
	onLoad(options) {
		this.id=options.id
	},
	mounted() {
		this.productDetail();
		this.getcondition();
	},
	methods:{
		/*完成编辑*/
		finish(){
			var that=this
		if(that.fileList.length===0){
			that.postDate();
		}else{
			let temp=0;
			that.fileList.forEach(i=>{
				if(i.thumb){
					uni.uploadFile({
						url: port + '/publish/uploadFile',
						filePath: i.url,
						name: 'file',
						success(res) {
							console.log(res);
							let result = JSON.parse(res.data);
							that.imageList.push(result.url);
							temp++;
							if(temp===that.imageList.length){
								that.postDate();
							}
						},
						fail(err) {
							console.log(err);
						}
					})
				}else{
					that.postDate();
				}
			})
		}
		},
		/*完成接口*/
		postDate(){
			var that=this
			let list=that.list
			//处理交易方式数据
			if(that.transitionMode.length===2){
				list.transactionMode=2
			}else if(that.transitionMode.length===1&&that.transitionMode[0]===0){
				list.transactionMode=0
			}else{
				list.transactionMode=1
			}
			console.log(list.transactionMode);
			//处理图片数组
			let arr=[];
			that.fileList.forEach(i=>{
				if(!i.thumb){
					arr.push(i.url)
				}
			})
			let Array=arr.concat(that.imageList);
			that.$request({
				url:'/publish/productEditor',
				method:"POST",
				data:{
					address:list.address,
					phone:list.phone,
					degree:list.degree,
					tradeName:list.tradeName,
					secondHandPrice:list.secondHandPrice,
					originPrice:list.originPrice,
					remark:list.remark,
					title:list.title,
					transactionMode:list.transactionMode,
					picUrl:JSON.stringify(Array),
					subcategory:list.subcategory,
					category:list.category,
					status:list.status,
					deposit:list.deposit,
					price:list.price,
					id:list.id,
				}
			}).then(res=>{
				console.log(res);
			})
		},
		/*商品详情*/
		productDetail(){
			var that=this
			that.$request({
				url:'/publish/productDetail',
				method:"POST",
				data:{
					id:that.id,
				}
			}).then(res=>{
				console.log(res)
				if(res.data.code==0){
					that.list=res.data.data
					if(res.data.data.transactionMode===0){
						that.transitionMode.push('0')
					}else if(res.data.data.transactionMode===1){
						that.transitionMode.push('1')
					}else{
						that.transitionMode.push('0','1')
					}
					res.data.data.picUrl.forEach(i=>{
						that.fileList.push({
							url:i
						})
					})
				}
			})
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
		/*切换状态*/
		/*选中状态*/
		getstates:function(e){
			let index = e.detail.value
			console.log(e);
			if(index==0){
				this.list.status=0
			}else{
				this.list.status=1
			}
		},
		/*选中成色*/
		getchange: function(e) {
			let index = e.detail.value
			this.list.degree = this.condition[index]
		},
		/*有无押金*/
		changeDeposit(e){
			console.log(e);
		},
		/*选中交易方式*/
		gettransaction: function(val) {
			console.log(val);
			this.transitionMode=val
		},
		/*跳转地址页*/
		Goaddress: function() {
			uni.navigateTo({
				url: '../USER/address'
			})
		},
		/*选中地址*/
		otherFun: function(form) {
			this.list.address = form.province + form.city + form.area
			this.list.phone = form.phone
		},
		/*添加图片*/
		afterRead: function(file, lists, name) {
			this.fileList = this.fileList.concat(file.file)
		},
		// 删除图片
		deletePic(file, lists, name) {
			this.fileList.splice(file.index,1)
		},
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
