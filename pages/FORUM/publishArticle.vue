<template>
	<view>
		<view class="container">
			<view class="shm_button_small float_right" @click="publish">
				<text>
					发表
				</text>
			</view>
		</view>
		<view class="container">
			<u--textarea v-model="value"  placeholder="发表内容" count></u--textarea>
		</view>
		<view class="container">
			<u-upload
			name="image"
			 accept="image"
			  multiple 
			  :maxCount="3"
			  uploadIconColor="#E31D1C"
			  :fileList="fileList"
			   @afterRead="afterRead"
			   @delete="deletePic"
			>
			</u-upload>
		</view>
		<showModal></showModal>
	</view>
</template>

<script>
	import {port} from '../../config/portConfig.js'
	export default {
		data() {
			return {
				value:'',
				fileList:[],//前端存储的图片列表
				imageList:[],//返回后端的图片路径
				nickName:'',
				avatarUrl:'',
			};
		},
		onLoad() {
			var that=this
			uni.getStorage({
				key:'NICKNAME',
				success: function (res) {
					that.nickName=res.data
				    }
			})
			uni.getStorage({
				key:'AVATARURL',
				success: function (res) {
					that.avatarUrl=res.data
				    }
			})
		},
		methods:{
            /*发布*/
			publish(){
				var that=this
				that.$showModal({
					content:'是否确认发布',
					success(res){
						if(res.confirm){
							uni.showLoading({
							})
							if(that.imageList.length!==0){
								that.fileList.forEach(item=>{
									uni.uploadFile({
									  url:port + '/publish/uploadFile',
									  filePath:item.thumb,
									  name:'file',
									  success(res) {
									  	let result = JSON.parse(res.data);
										that.imageList.push(result.url);
										if(that.imageList.length == that.fileList.length){
											that.addArticle();
										}
									  }
									})
								})
								
							}else{
								that.addArticle();
							}
						}
					}
				})
			},
			/*发布请求*/
			addArticle(){
				var that=this
				that.$request({
					url:'/forum/addArticles',
					method:"POST",
					data:{
						nickName:that.nickName,
						avatarUrl:that.avatarUrl,
						text:that.value,
						img:JSON.stringify(that.imageList),
					}
				}).then(res=>{
					if(res.data.code==0){
						uni.hideLoading()
						uni.showToast({
							title:"发布成功",
							success() {
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1000)
							}
						})
					}else{
						uni.hideLoading()
						uni.showToast({
							title:'文章格式错误',
							icon:'error'
						})
					}
				})
			},
			/*添加图片*/
			afterRead: function(file, lists, name) {
				this.fileList = this.fileList.concat(file.file)
			},
			// 删除图片
			deletePic(file, lists, name) {
				this.fileList.splice(lists, 1)
			},
		}
	}
</script>

<style lang="scss">
 page{
	 background-color: #FFFFFF;
 }
</style>
