"use strict";

var _electron = require("electron");

var _electron2 = _interopRequireDefault(_electron);

var _DroneHttpServer = require("./DroneHttpServer");

var _DroneHttpServer2 = _interopRequireDefault(_DroneHttpServer);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _electron2.default.app;
var ipc = _electron2.default.ipcMain;
var BrowserWindow = _electron2.default.BrowserWindow;

var mainWindow = null;
var videoWindow = null;

var PORT = 3001;
var VPORT = 3002;
var server = null;

app.on('window-all-closed', function () {
				if (process.platform != 'darwin') {
								_http2.default.request({
												host: 'localhost',
												port: '3001',
												path: '/api/robots/Scratch4D/devices/drone/commands/land'
								}, function (response) {
												console.log(response);
								});
								app.quit();
				}
});

app.on('ready', function () {
				mainWindow = new BrowserWindow({ width: 1920, height: 1080, icon: __dirname + '/../drone.ico' });
				mainWindow.loadURL('file://' + __dirname + '/../view/setup.html');
				mainWindow.on('closed', function () {
								console.log("window closed") + _http2.default.request({
												host: 'localhost',
												port: '3001',
												path: '/api/robots/Scratch4D/devices/drone/commands/land'
								}, function (response) {
												console.log(response);
								});

								mainWindow = null;
								app.quit();
				});
});

ipc.on('drone', function (event, arg) {
				console.log("ipc called");
				var DroneServer = new _DroneHttpServer2.default(arg);
				DroneServer.start();
});