var fs = require('fs');
var later = require('later');
var nodegrass = require('nodegrass');
var lineReader = require('line-reader');

var reg = /GET \/(.*)\b80\s?\b/i;
var urls = [];
/* 从IIS日志文件中提取IIS请求地址记录到 urls数组中 */
console.log('>>开始进行IIS日志文件的请求地址分析...');
lineReader.eachLine('iis.log', function(line) {
	line = reg.test(line);
	line = RegExp.$1.replace(' ','?');
	urls.push(line);
	//console.log(i + "、" + line);
	//i++;
}).then(function () {
	//console.log();
  	console.log(">>日志文件已读取完毕...");
  	console.log(">>开始执行HTTP请求任务...");
});

later.date.localTime();

/* 一秒执行一次http请求 */
var sched = later.parse.recur().every(1).second(),
    t = later.setInterval(function() {
        sendRequest();
    }, sched);

var i = 0;
function sendRequest() {
	var url = 'http://order.fanhuan.com/' + urls[i];
	reg = /&ui=(\d+)/i;
	if(reg.test(url))
	{
		var userId = RegExp.$1;
		if(userId.length != 12)
		{}
	}
	console.log(url);
	i++;
	/*
    nodegrass.get(url,function(data, status, headers){
   		console.log();
   		console.log(url);
		//console.log("status：" + status);
		//console.log("headers：" + headers);
		console.log("response data：" + data);
		i++;
		if(i == urls.length)
		{
			t.clear();
			console.log(">>任务已全部执行完成...");
		}
	},'utf8').on('error', function(e) {
		console.log();
		console.log(">>Http 请求失败：" + e.message);
	});
	*/
}

/*
console.log('>>正在请求京东商品地址...');
nodegrass.get('http://item.jd.com/1256542.html',function(data, status, headers){
	console.log('>>正在尝试写入页面信息...');
	fs.appendFile('html.txt', data, function(err){
		if(err)
		{
	        console.log(err);
	    }
    });
},'utf8').on('error', function(e){
	console.log();
	console.log(">>Http 请求失败：" + e.message);
});
*/

/* 	15秒之后停止
setTimeout(function(){
   t.clear();
   console.log();
   console.log(">>任务已全部执行完成...");
}, 15 * 1000);
 */