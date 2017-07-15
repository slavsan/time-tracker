import * as React from 'react';
import * as moment from 'moment';
import { Duration } from 'moment/moment';
import { v4 as uuid } from 'uuid';
import Task from './types/task';
import Activity from './types/activity';
import Navigation from './components/Navigation';
import Pages from './components/Pages';
import ActivitiesPage from './components/ActivitiesPage';
import HistoryPage from './components/HistoryPage';
import StatsPage from './components/StatsPage';
import SettingsPage from './components/SettingsPage';
import './bootstrap/css/bootstrap.min.css';
import './bootstrap/css/bootstrap-theme.min.css';
import './TimeTracker.css';

type Props = {};
type State = {
  activeTab: number,
  tasks: Array<Task>,
  activities: Array<Activity>,
  activeTask: string,
  interval?: any
};

class TimeTracker extends React.Component<{}, {}> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      activeTab: 1,
      tasks: [],
      activities: [],
      activeTask: ''
    };

    this.setActiveTab = this.setActiveTab.bind(this);
    this.startTask = this.startTask.bind(this);
    this.pauseTask = this.pauseTask.bind(this);
    this.getActiveTask = this.getActiveTask.bind(this);
  }

  startTask(task: Task) {
    clearInterval(this.state.interval);
    this.pauseTask(() => {
      this.setState(
        {activeTask: task.id, interval: null},
        () => {
          const activity: Activity = {
            id: uuid(),
            taskId: task.id,
            beginDate: moment().toString()
          };
          const activities = this.state.activities;
          activities.push(activity);
          this.setState(
            {activities: activities},
            () => {
              this.trackActivity();
              const interval = setInterval(
                () => {
                  this.trackActivity();
                },
                1000
              );
              this.setState({interval});
            }
          );
          // - this activity should have no end date so it should be considered
          //   the current/ongoing activity
          // - all the other activities for a task should have their times already
          //   calculated so that we don't parse the time spent for each of them
          //   continuously
          // - all the seconds should be calculated and displayed in a formatted way
          //   after each second
          // - there should be a chronological list of activities for today which
          //   should show how much time was spent for each activity
          // - there should be a summary of all time spent for all tasks
        }
      );
    });
  }

  getTaskActivities(task: Task) {
    const activities = this.state.activities.filter(a => a.taskId === task.id);
    console.log('search activities for: %s, count is %o', task.id, activities.length);
    return activities;
  }

  pauseTask(cb: Function) {
    const activity = this.getCurrentActivity();
    if (!activity) {
      if (cb) {
        return cb();
      }
    }
    activity.endDate = moment().toString();
    const activities = this.state.activities;
    clearInterval(this.state.interval);
    this.setState({activeTask: '', interval: null, activities}, () => {
      if (cb) {
        cb();
      }
    });
  }

  getActiveTask(): Task {
    return this.state.tasks.filter(t => t.id === this.state.activeTask)[0];
  }

  trackActivity() {
    const activeTask = this.getActiveTask();
    activeTask.timeSpent = this.getTimeSpent(activeTask);
    this.setState({tasks: this.state.tasks});
  }

  getTimeSpent(task: Task): Duration {
    const taskActivities = this.getTaskActivities(task);
    // console.log('task activities %s: %o', JSON.stringify(task), taskActivities);

    const start = moment();
    const end = moment();
    let totalTimeSpent: Duration = moment.duration(end.diff(start));

    taskActivities.forEach(activity => {
      if (activity.timeSpent) {
        // console.log('time spent is available');
        if (totalTimeSpent) {
          totalTimeSpent.add(activity.timeSpent);
          return;
        }
        totalTimeSpent = activity.timeSpent;
        return;
      }
      if (activity.beginDate && activity.endDate) {
        // console.log('begin date AND end date');
        const start = moment(activity.beginDate);
        const end = moment(activity.endDate);
        const timeSpent = moment.duration(end.diff(start));
        if (totalTimeSpent) {
          totalTimeSpent.add(timeSpent);
          return;
        }
        totalTimeSpent = timeSpent;
        return;
      }
      if (activity.beginDate && !activity.endDate) {
        // console.log('only begin date');
        const start = moment(activity.beginDate);
        const end = moment();
        const timeSpent = moment.duration(end.diff(start));
        if (totalTimeSpent) {
          totalTimeSpent.add(timeSpent);
          return;
        }
        totalTimeSpent = timeSpent;
        return;
      }
    });

    return totalTimeSpent;
  }

  getCurrentActivity(): Activity {
    const ongoingActivities = this.state.activities.filter(a => !a.endDate);
    if (ongoingActivities.length > 1) {
      console.error('more than one ongoing activities');
    }
    console.log('ongoing activities', ongoingActivities);
    return ongoingActivities[0];
  }

  setActiveTab(activeTab: number) {
    this.setState({activeTab});
  }

  renderPages() {
    if (this.state.activeTab === 1) {
      return (
        <ActivitiesPage
          tasks={this.state.tasks}
          activities={this.state.activities}
          activeTask={this.state.activeTask}
          startTask={this.startTask}
          pauseTask={this.pauseTask}
        />
      );
    }

    if (this.state.activeTab === 2) {
      return <HistoryPage />;
    }

    if (this.state.activeTab === 2) {
      return <StatsPage />;
    }

    return <SettingsPage />;
  }

  render() {
    return (
      <div id="main">
        <Navigation
          activeTab={this.state.activeTab}
          onChangeTab={(activeTab: number) => this.setActiveTab(activeTab)}
        />
        <Pages>
          {this.renderPages()}
        </Pages>
      </div>
    );
  }
}

export default TimeTracker;
