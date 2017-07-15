import * as React from 'react';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';
import Task from './types/task';
import Activity from './types/activity';
import Navigation from './components/Navigation';
import Pages from './components/Pages';
import ActivitiesPage from './components/ActivitiesPage';
import HistoryPage from './components/HistoryPage';
import StatsPage from './components/StatsPage';
import SettingsPage from './components/SettingsPage';
import TimeSpentCalculator from './lib/TimeSpentCalculator';
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
        }
      );
    });
  }

  getTaskActivities(task: Task) {
    const activities = this.state.activities.filter(a => a.taskId === task.id);
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
    activeTask.timeSpent = TimeSpentCalculator.getTimeSpentForAllActivities(this.getTaskActivities(activeTask));
    this.setState({tasks: this.state.tasks});
  }

  getCurrentActivity(): Activity {
    const ongoingActivities = this.state.activities.filter(a => !a.endDate);
    if (ongoingActivities.length > 1) {
      throw new Error('more than one ongoing activities');
    }
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
      return (
        <HistoryPage
          activities={this.state.activities}
          tasks={this.state.tasks}
        />
      );
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
