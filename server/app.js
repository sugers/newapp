var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var axios = require('axios')

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
app.get('/api/keyList', function (req, res) {
  res.jsonp({
    errno:0
  })
  // var url = 'http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&start=0&count=99&kw=摄&start=0&count=99';
  // axios.get(url, {
  //   headers: {
  //     referer: 'http://wallpaper.apc.360.cn/',
  //     host: 'wallpaper.apc.360.cn/'
  //   }
  // }).then((response) => {
  //   res.jsonp(response)
  // }).catch((e) => {
  //   console.log(e)
  // })
})
app.listen(3030);
