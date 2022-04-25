<template>
	<view class="containerBox nav_content">
		<view class="flex_around">
			<view class="flex_column_center nav_tap" v-for="(item,index) in list" :key="index" @click="Godetail(item.id)">
					<text class="num">{{item.number?item.number:'0'}}</text>
					<text>{{item.title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				list:[
					{
						id:0,
						title:'我发布的',
						number:'',
					},
					{
						id:3,
						title:'我收藏的',
						number:'',
					}
				]
			}
		},
		methods:{
			/*获取商品统计数据*/
			getstock(){
				var that=this
				that.$request({
					url:'/User/getStock',
					method:"POST",
				}).then(res=>{
					console.log(res);
					if(res.data.code==200){
						let data=res.data.data
						that.list[0].number=data.published
						that.list[1].number=data.collected
					}
				})
			},
			/*跳转*/
			Godetail(id){
				switch(id){
					case 0:
					uni.navigateTo({
						url:"/pages/PUBLISH/management"
					})
					break;
					case 3:
					uni.navigateTo({
						url:"/pages/USER/collected"
					})
				}
			}
		},
		mounted() {
			
		},
		created() {
			this.getstock();
		}
	}
</script>

<style lang="scss">
	.nav_content{
		margin-top: -80rpx;
		position: relative;
		z-index: 10;
		.nav_tap{
			font-size: $uni-font-size-h4;
             text{
				 text-align: center;
				 color: $uni-text-color;
			 }
			 .num{
				 font-size:$uni-font-size-g1;
				 font-weight: bold;
			 }
		}
	}
</style>
