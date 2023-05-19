// 打印计算结果
'use strict';
var moment = require('moment');
const WebSocket = require('ws')
const DIGIT = 6
const wss = new WebSocket.Server({ port: 8080 })
var minute1Map = new Map();
var minute5Map = new Map();
wss.on('connection', ws => {
    ws.on('message', message => {
    var ms = eval(message.toString())
        for(var j=0;j<ms.length;j++){
            var formatDate = moment(ms[j][0]).format('YYYY-MM-DD HH:mm');
            if (minute1Map.has(formatDate)){
                var newCount = minute1Map.get(formatDate).count+1
                var newSum = minute1Map.get(formatDate).sum + ms[j][1]
                minute1Map.set(formatDate, {count:newCount,average:(newSum/newCount).toFixed(DIGIT),sum:newSum});
            }else {
                minute1Map.set(formatDate, {count:1,average:ms[j][1],sum:ms[j][1]});
            }
        }
        console.log("一分钟平均值:",minute1Map)
        for(var j=0;j<ms.length;j++){
            var formatDate = pare5min(ms[j][0]);
            if (minute5Map.has(formatDate)){
                var newCount = minute5Map.get(formatDate).count+1
                var newSum = minute5Map.get(formatDate).sum + ms[j][1]
                minute5Map.set(formatDate, {count:newCount,average:(newSum/newCount).toFixed(DIGIT),sum:newSum});
            }else {
                minute5Map.set(formatDate, {count:1,average:ms[j][1],sum:ms[j][1]});
            }
        }
        console.log("五分钟平均值:",minute5Map)
    })
})


function pare5min(min) {
    var formatDate = (moment(min).format('YYYY-MM-DD HH:mm')).split(":");
    var x
    switch (parseInt(formatDate[1]/5)){
        case 0:
            x=0;
            break
        case 1:
            x=5;
            break
        case 2:
            x=10;
            break
        case 3:
            x=15;
            break
        case 4:
            x=20;
            break
        case 5:
            x=25;
            break
        case 6:
            x=30;
            break
        case 7:
            x=35;
            break
        case 8:
            x=40;
            break
        case 9:
            x=45;
            break
        case 10:
            x=50;
            break
        case 11:
            x=55;
            break
        default:
            x=0
    }
    return formatDate[0]+":"+x
}


