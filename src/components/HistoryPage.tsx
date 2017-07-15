import * as React from 'react';
import * as moment from 'moment';
import Activity from '../types/activity';
import { Grid, Col, Row } from 'react-bootstrap';
import Task from '../types/task';
import TimeSpentCalculator from '../lib/TimeSpentCalculator';
import 'moment-duration-format';
import './HistoryPage.css';

type Props = {
  tasks: Array<Task>,
  activities: Array<Activity>
};

class HistoryPage extends React.Component<{}, {}> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  taskName(activity: Activity): string {
    const task = this.props.tasks.filter(t => t.id === activity.taskId)[0];
    return (task && task.name) || '';
  }

  timeSpent(activity: Activity): string {
    const timeSpent = TimeSpentCalculator.getTimeSpentForActivity(activity, TimeSpentCalculator.getInitialDuration());
    return timeSpent.format('HH:mm:ss', {trim: false});
  }

  render() {
    return (
      <Grid className="HistoryPage">
        <Row>
          <Col>
            <Row className="header">
              <Col sm={3} md={3} xs={3}>
                <span>Name</span>
              </Col>
              <Col sm={3} md={3} xs={3}>
                <span>Begin</span>
              </Col>
              <Col sm={3} md={3} xs={3}>
                <span>End</span>
              </Col>
              <Col sm={3} md={3} xs={3}>
                <span>Spent</span>
              </Col>
            </Row>
            {this.props.activities.map(activity =>
              <Row key={activity.id}>
                <Col sm={3} md={3} xs={3}>
                  {this.taskName(activity)}
                </Col>
                <Col sm={3} md={3} xs={3}>
                  {moment(activity.beginDate).format('HH:mm:ss')}
                </Col>
                <Col sm={3} md={3} xs={3}>
                  {moment(activity.endDate).format('HH:mm:ss')}
                </Col>
                <Col sm={3} md={3} xs={3}>
                  {this.timeSpent(activity)}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default HistoryPage;
