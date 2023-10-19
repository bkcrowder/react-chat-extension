import React from 'react';
import ReactDOM from 'react-dom/client';
import { listenToTab } from './components/listeners';
import AppRouter from './app.router';
import { owner } from './settings/events';

const root = document.createElement("div")
root.className = "container"
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);

chrome.tabs.onUpdated.addListener(listenToTab)

rootDiv.render(
  <React.StrictMode>
    <AppRouter
      owner={owner.popup}
      streamer=''
      username=''
    />
  </React.StrictMode>
);