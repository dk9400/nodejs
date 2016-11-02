var fs = require('fs');
var data = '';

//创建可读流
var readerStream = fs.createReadStream('input.txt');
readerStream.setEncoding('UTF8');
//处理流事件
readerStream.on('data', function(chunk){
   data += chunk; 
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");