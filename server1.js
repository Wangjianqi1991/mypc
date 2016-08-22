var http = require('http'),
    fs = require('fs'),
    url = require('url');
//创建一个服务
var server1 = http.createServer(function (req, res) {//request==req  response==req

    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;
    //处理静态资源文件的请求 =>前端路由
    var reg=/\.(HTML|JS|CSS|JSON|TXT|ICO|JPG|GIF|PNG|BMP)/i;
    if (reg.test(pathname)){
        var suffix=reg.exec(pathname)[1].toUpperCase();
        //根据请求文件的后缀名 获取当前文件的 MIME 类型
        var suffixMIME="text/plain";
        switch (suffix){
            case "HTML":
                suffixMIME="text/html";
                break;
            case "JS":
                suffixMIME="text/javascript";
                break;
            case "CSS":
                suffixMIME="text/css";
                break;
            case "TXT":
                suffixMIME="text/txt";
                break;
            case "JSON":
                suffixMIME="application/json";
                break;
           /* case "ICO":
                suffixMIME="application/html";
                break;*/
        }
        //按照指定的目录读取文件中的内容或者代码
        try {
            var conFile=fs.readFileSync("."+pathname,"utf-8");
            //重写响应头信息:告诉客户端
            res.writeHead(200,{'content-type':suffixMIME+';charset=utf-8;'});
            //服务端向客户端返回内容也是字符串
            res.end(conFile);
        } catch (e) {
            res.writeHead(404,{'content-type':'text/plain;charset=utf-8;'});
            res.end("request file is not found~")
        }
    }
/*    try {
        var con = fs.readFileSync("." + pathname, "utf-8");
        res.end(con);
    } catch (e) {
        res.end("request file is not find~")
    }*/

});
//为当前的这个服务配置端口
server1.listen(888, function () {
    console.log('server is success,listening on 888 port')
});
