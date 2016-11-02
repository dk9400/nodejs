var buf = new Buffer(256);
//写入
var len = buf.write('www.runoob.com');
console.log('写入字节数：'+len);
//读取
buf = new Buffer('www.runoob.com');
console.log( buf.toString('ascii'));      
console.log( buf.toString('ascii',0,5));   
console.log( buf.toString('utf8',0,5));    
console.log( buf.toString(undefined,0,5)); 
//转换JSON对象
var json = buf.toJSON(buf);
console.log(json);
//合并buffer对象
var buffer1 = new Buffer('菜鸟教程 ');
var buffer2 = new Buffer('www.runoob.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());

var buffer1 = new Buffer('ABC');
// 拷贝一个缓冲区
var buffer2 = new Buffer(3);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());

var buffer1 = new Buffer('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());