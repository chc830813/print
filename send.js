// 输入数据 二维数组
'use strict';
const http = require('http')
const WebSocket = require('ws')
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
var BACKSPACE = String.fromCharCode(127);

process.stdout.write('请输入二维数组数据:');
var stdin = process.stdin;
stdin.resume();
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
var sendData = '';
stdin.on('data', function (ch) {
    ch = ch.toString('utf8');
    switch (ch) {
        case "\n":
        case "\r":
        case "\u0004":
            process.stdout.write('\n');
            event.emit("startSend",sendData)
            break;
        case "\u0003":
            process.stdout.write('\n');
            console.log("中断了输入，退出。");
            process.exit(0);
            break;
        case BACKSPACE:
            sendData = sendData.slice(0, sendData.length - 1);
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write("请输入二维数组数据:");
            process.stdout.write(sendData.split('').join(''));
            break;
        default:
            sendData += ch;
            process.stdout.write(ch);
            break;
    }
});

const url = 'ws://localhost:8080'
const connection = new WebSocket(url)

connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
    console.log(e.data)
}

event.on('startSend', function(data){
    connection.send(data)
    sendData = ''
    process.stdout.write('请输入二维数组数据:');

})
const server = http.createServer(()=>{})
server.listen(0,()=>{})