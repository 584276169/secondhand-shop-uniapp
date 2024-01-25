import io from 'weapp.socket.io';

const controll=2;   // 1未生产环境  2为开发环境
let  server='http://localhost:3000';

let socket=io(server);

module.exports={
	socket
}