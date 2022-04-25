import io from 'weapp.socket.io';

const controll=2;   // 1未生产环境  2为开发环境
let  server='';
if(controll===1){
	server='';
}else if(controll===2){
	server='http://localhost:3000';
} 

let socket=io(server);

module.exports={
	socket
}