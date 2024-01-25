<template>
	<view>
		<articleItem :article="article"></articleItem>
		<!--评论-->
		<view class="container review_content">
			<view class="review_title">
				<text class="modul_title">评论{{totalnum}}</text>
				<text class="liked">赞{{article[0].liked}}</text>
			</view>
			<reviewList :list='list' :btn_logo='btn_logo'  @OpenPop="openPoP" @Reply='reply' ></reviewList>
		</view>
		<!--评论详情-->
		<u-popup :show="popupShow"  mode="bottom" @close="popClose" closeable round="15">
			<view class="" style="padding: 10rpx;">
				<articleItem :article="ChildReview"></articleItem>
				<scroll-view scroll-y="true"  style="padding: 10rpx; height:800rpx;box-sizing: border-box;">
					<reviewList :list='list' :btn_logo='btn_logo' :parent_id='ChildReview[0].id'  @OpenPop="openPoP" @Reply='reply' ></reviewList>
				</scroll-view>
			</view>
		</u-popup>
				<!--底部tap-->
		<bottomTap :input_plachholder="input_plachholder" :parent_id="parent_id" :hide_input='hide_input'
			@hidemark="HideMark" @changemark="changeMark" @sendvalue="SendValue"></bottomTap>
	</view>
</template>

<script>
	import bottomTap from '../../components/forum/bottom_tap.vue'
	import articleItem from '../../components/forum/articleItem.vue'
	import reviewList from '../../components/forum/reviewList.vue'
	export default {
		data() {
			return {
				popupShow:false,//评论详情pop
				input_plachholder: '', //输入框placeholder
				parent_id: 0, //评论所属父亲的id
				avatarUrl: '', //头像
				nickName: '', //昵称
				hide_input: true, //输入框显示与隐藏
				id:0, //文章id
				page: 1,
				totalnum: '',
				list: [],
				ChildReview:[],//单个评论数据
				article: [],
				btn_logo: [{
						icon: '../../static/article_msg.png',
						id: 0,
					},
					{
						icon: '../../static/article_like.png',
						liked: true,
						id: 1,
					},
				]
			};
		},
		components: {
			bottomTap,
			articleItem,
			reviewList
		},
		onLoad(options) {
			this.id = options.id
			this.nickName = uni.getStorageSync("NICKNAME");
			this.avatarUrl = uni.getStorageSync("AVATARURL")

		},
		methods: {
			/*获取文章详情*/
			articleDetail() {
				var that = this
				that.$request({
					url: '/forum/articlesDetail',
					method: "POST",
					data: {
						id: that.id
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 0) {
						that.article = res.data.data
					}
				})
			},
			/*获取评论*/
			reviewList() {
				var that = this
				that.$request({
					url: '/forum/reviewList',
					method: "POST",
					data: {
						page: that.page,
						belongTo_id: that.id,
						parent_id: 0,
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 0) {
						that.list = that.list.concat(res.data.data)
						that.totalnum = res.data.totalnum
					}
				})
			},
			/*添加评论*/
			SendValue(value, parent_id) {
				var that = this
				that.$request({
					url: '/forum/addReview',
					method: "POST",
					data: {
						text: value,
						nickName: that.nickName,
						avatarUrl: that.avatarUrl,
						parent_id: parent_id,
						belongTo_id: that.id,
						to_nickName:that.input_plachholder,
					}
				}).then(res => {
					console.log(res);
					if (res.data.code == 0) {
						that.hide_input = !that.hide_input
						that.page = 1
						that.list = []
						that.input_plachholder = ''
						that.reviewList()
					}
				})
			},
			/*文章点赞*/
			updateliked() {
				var that = this

			},
			/*评论点赞*/
			reviewLiked(itemID,index){
				var that=this
				that.$request({
					url:'/forum/likedUpdate',
					method:"post",
					data:{
						id:itemID,
					}
				}).then(res=>{
					console.log(res);
					if(res.data.code==0){
						let like=that.list[index].liked+1
						that.$set(that.list[index],'liked',like);
					}
				})
			},
			reply(childID, itemID, itemName,index) {
				if (childID == 0) {
					//评论回复
					this.hide_input = !this.hide_input
					this.parent_id = itemID
					this.input_plachholder = itemName
				} else if (childID == 1) {
					//评论点赞
                 this.reviewLiked(itemID,index);
				}
			},
			/*隐藏遮罩*/
			HideMark(hide_input) {
				this.hide_input = true;
			},
			/*底部tap*/
			changeMark(hide_input, id) {
				if (id === 1) {
					//回复输入框显示
					this.hide_input = !this.hide_input;
					this.input_plachholder = '';
					this.parent_id=0;
				}else if(id===2){
					//文章点赞
					let that=this
					that.$request({
						url: '/forum/articleLiked',
						method: "POST",
						data: {
							id: that.article[0].id,
						}
					}).then(res => {
						console.log(res);
						if (res.data.code == 0) {
							let num=that.article[0].liked
							num++;
						  that.$set(that.article[0],'liked',num);
						}
					})
				}
			},
			/*评论详情*/
			openPoP(item){
				var that=this
				that.ChildReview.push(item)
				that.popupShow=!that.popupShow
			},
			/*评论详情弹窗关闭*/
			popClose(){
				this.popupShow=false
				this.ChildReview=[]
			}
		},
		mounted() {
			this.articleDetail()
			this.reviewList()
		},
		onReachBottom() {
			if (this.list.length !== this.totalnum) {
				this.page++
				this.reviewList()
			}
		},
	}
</script>

<style lang="scss">
	.review_content {
		margin: 25rpx 0 50rpx 0;

		.review_title {
			padding-bottom: 15rpx;
			border-bottom: 0.5rpx solid $uni-bg-color-grey;

			.liked {
				float: right;
				font-size: $uni-font-size-h3;
				color: $uni-text-color;
			}
		}
	}
</style>
