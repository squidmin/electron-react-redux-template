import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

/* Inter-process communication
     Used for sending messages from the main window process to the separate Electron app process. */
const { ipcRenderer } = require('electron');


class VideoInfoScreen extends Component {

  componentDidMount() {
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const { path } = document.querySelector('input').files[0];
      // Send a message from the main window process to the separate Electron app process.
      ipcRenderer.send('video:submit', path);
      // debugger  // Make the browser window pause execution
    });
  }

  render() {
    return (
      <div style={{ paddingLeft: '30px' }}>
        <h1>Video Info</h1>
        <form>
          <div>
            <label>Select a video</label>
            <input type='file' accept='video/*' />
          </div>
          <button type='submit'>
            Get Info
          </button>
        </form>
        <h1 id='result'></h1>
        <script src='test.js'></script>
      </div>
    );
  }

}


// Receive a message from the Electron app process to the separate main window process.
ipcRenderer.on('video:metadata', (event, duration) => {
  document.querySelector('#result').innerHTML = `Video is: ${duration}`;
});

export default connect(null, actions)(VideoInfoScreen);