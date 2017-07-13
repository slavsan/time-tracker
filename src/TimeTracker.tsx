import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import './bootstrap/css/bootstrap.min.css';
import './bootstrap/css/bootstrap-theme.min.css';
import './TimeTracker.css';

class TimeTracker extends React.Component<{}, {}> {
  render() {
    return (
      <div id="main">
        <FormControl type="text" placeholder="Add or search for a task.." />
      </div>
    );
  }
}

export default TimeTracker;
