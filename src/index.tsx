import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
import TimeTracker from './TimeTracker';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <TimeTracker />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
