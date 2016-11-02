//引入events模块
var events = require('events');
//创建eventEmitter对象
var eventsEmitter = new events.EventEmitter();

//创建事件处理程序
var connectHandler = function connected() {
    console.log('连接成功。');
}



//绑定connection事件处理程序
eventsEmitter.on('connection',connectHandler);

//使用匿名函数绑定data_received事件
eventsEmitter.on('data_received',function(){
    console.log('数据库接收成功');
});


//触发connection事件
eventsEmitter.emit('connection');
//触发data_received事件
eventsEmitter.emit('data_received');




console.log('程序执行完毕');