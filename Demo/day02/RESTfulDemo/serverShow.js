var express = require('express');
var fs = require('fs');

var app = express();

app.get('/:id',function(req,res){
    fs.readFile(__dirname+'/'+'users.json','utf8',function(err,data){
        data = JSON.parse(data);
        var user = data['user'+req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    });
});


var server = app.listen(8081,function(){
    var host = server.address().address;
    var port = server.address().port;
      console.log("应用实例，访问地址为 http://%s:%s", host, port);
});