<template>
	<view class="container">
		<rich-text :nodes="list"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:'',
			};
		},
		mounted() {
			this.agreementList()
		},
		methods:{
			/*获取协议内容*/
			agreementList(){
				var that=this
				that.$request({
					url:'/manager/agreenmentList',
					method:'GET',
				}).then(res=>{
					console.log(res);
					if(res.data.code==0){
						that.list=res.data.data[0].agreement
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
