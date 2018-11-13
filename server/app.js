var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var axios = require('axios')
var http = require('http')
var request = require("request");
var app = express();
var routes = express.Router();
//数据文件
var getlist = require('../mock/getlist.json');
var idimg = require('../mock/getIdList.json');

//反向代理
// var proxy = require("http-proxy-middleware");
// const apiProxy = proxy('/api', { target: 'http://wallpaper.apc.360.cn',changeOrigin: true });
// app.use('/', apiProxy);//api子目录下的都是用代理

app.use('/api', routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));


//解决跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://wallpaper.apc.360.cn");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
  if (req.method == 'OPTIONS') {
    //让options请求快速返回
    res.sendStatus(200);
  } else {
    next();
  }
})



//访问单页
app.get('/api/getlist', function (req, res) {
  res.jsonp({
    errno: 0,
    data: getlist
  })
});
app.get('/api/idimg', function (req, res) {
  res.jsonp({
    errno: 0,
    data: idimg
  })
});

//爬取数据

app.post('/api/keyList', function (req, res) {
  var kw = req.body.kw;
  var geturl="http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&start=0&count=99&kw="+kw;
  var options = {
    method: 'GET',
    url: geturl,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36'
    }
  };

  request(options, function (error, response, body) {
    if (error) console.log(error);

    fs.writeFile("../mock/search.json", body, function (err) {
        if (err) throw err;
        console.log("File Saved !"); //文件被保存
      })
    // console.log(response)
    // console.log(body);
  });


  // var url="http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&start=0&count=99&kw="+kw+"&start=0&count=99
  // http.get({
  //       hostname: 'wallpaper.apc.360.cn',
  //       path: "/index.php?c=WallPaper&a=search&start=0&count=99&kw="+kw+"&start=0&count=99",
  //       method: 'GET',
  //       headers:{
  //           'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
  //       }
  //   },
  //   res => {
  //     var size = 0;
  //     var chunks = [];
  //     res.on('data', data => {
  //       size += data.length;
  //       chunks.push(data);
  //     })
  //     res.on('end', function () {
  //       var data = Buffer.concat(chunks, size);
  //       //写入文件
  //       fs.writeFile("../mock/search.json", data, function (err) {
  //         if (err) throw err;
  //         console.log("File Saved !"); //文件被保存
  //       })
  //     });
  //   }
  // )

  res.jsonp({
    errno: 0,
    // data:body
  })
});


app.get('/api/keyList', function (req, res) {
  var search = require('../mock/search.json');
  res.jsonp({
    errno: 0,
    data: search
  })
});

app.listen(3030);
