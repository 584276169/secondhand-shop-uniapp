const controll=2;   // 1未生产环境  2为开发环境
let  API_BASE_URL='';
if(controll===1){
	API_BASE_URL='';
}else if(controll===2){
	API_BASE_URL='http://localhost:3000';
}
 export const request=(options)=>{
	return new Promise((resolve,reject)=>{
		const openid=uni.getStorageSync('OPENID')
		uni.request({
			url:API_BASE_URL + options.url,
			method:options.method||"GET",
			data:options.data||{},
			header:{
				'openid':openid,
			},
			dataType:'json',
			success(res) {
				resolve(res);
			},
			fail(error) {
				reject(error);
			}
		})
		
	})
	
}

