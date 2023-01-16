const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

/* Inter-process communication (IPC) allows Electron's main 'app' process to communicate
     with the frontend process (e.g., React, Vue, etc.).  */
const { app, BrowserWindow, ipcMain } = electron;


let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      /* If backgroundThrottling is disabled, the visibility state will remain visible
         even if the window is minimized, occluded, or hidden.
         Read more: https://www.electronjs.org/docs/v14-x-y/api/browser-window#page-visibility */
      backgroundThrottling: false,
    }
  });

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});


// Receive a message from the main window process to the separate Electron process.
// The event object is useful in cases where the event could be received from any of several windows.
ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    console.log('Video duration is: ', metadata.format.duration);
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
  });
});
