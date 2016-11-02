//加载模块
var http = require('http'), //服务器创建
    dns = require('dns'),　　//ＤＮＳ查询
    fs = require('fs'),      //文件操作
    url = require('url'),   　//ｕｒｌ处理
    querystring = require('querystring');　//字符串处理

http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    req.setEncoding('utf8');
    res.writeHead(200,{'Content-Type':'text/html'});
    router(req,res,pathname);
}).listen(3000);


function router(req,res,pathname){
    switch (pathname){
        case '/parse':
            parseDns(req,res);
            break;
        default:
            goIndex(req,res);
    }
};

function goIndex(req,res){
    var readPath = __dirname+'/'+url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);
    res.end(indexPage);
};

function parseDns(req,res){
    var postData = '';
    req.addListener('data',function(postDataChunk){
        postData += postDataChunk;
    });
    
    req.addListener('end',function(){
        var retData = getDns(postData,function(domain,addresser){
            res.writeHead(200,{'Content_Type':'text/html'});
            res.end("<html>
                    <head>
                        <meta http-equiv='content-type' content='text/html;charset=utf-8'>
                    </head>
                    <div style='text-align:center'>
                        Domain:<span style='color:red'>"+domain+"</span>
                        IP:<span style='color:red'>"+addresses.join(',')+"</span>
                    </div>
                    </html>");
        });
        return;
    });
};

function getDns(postData,callback){
    var domain = querystring.parse(postdata).search_dns;
	dns.resolve(domain,function(err,addresses){
		if(!addresses){
			addresses = ['不存在域名'];
		}
		callback(domain,addresses);
	});
};
        