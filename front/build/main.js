// Module to control application life.
var app = require('app');
var path = require('path');
var iconPath = path.join(__dirname, 'assets/icons/png/officetime_icon_64.png');

// Module to create native browser window.
var BrowserWindow = require('browser-window');

var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
// ElectronScreencapture({x: 0, y: 0, width: 800, height: 600}).then(function(result){
// 	console.log("!!!!!");
	console.log(iconPath);
// });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
      titleBarStyle: 'hidden',
      width: 610,
      height: 415 ,
      icon: iconPath
  });
  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the devtools.
  // mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
    // mainWindow.webContents.openDevTools()
});