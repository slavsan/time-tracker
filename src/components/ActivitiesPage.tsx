import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { Form, FormControl } from 'react-bootstrap';
import TasksList from './TasksList';
import Task from '../types/task';
import Activity from '../types/activity';
import { FormEvent } from 'react';
import * as moment from 'moment';

type Props = {};
type State = {
  tasks: Array<Task>,
  activities: Array<Activity>,
  filterValue: string,
  activeTask: '',
  timeout?: any
};

interface MyEventTarget extends EventTarget {
  value: string;
}

interface MyFormEvent<T> extends React.FormEvent<T> {
  target: MyEventTarget;
}

const defaultTasks: Array<Task> = [
  // {id: '1', name: 'Task 1'},
  // {id: '2', name: 'Task 2'}
];

class ActivitiesPage extends React.Component<{}, {}> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: defaultTasks,
      activities: [],
      filterValue: '',
      activeTask: ''
    };

    this.addTask = this.addTask.bind(this);
    this.onChangeFilterValue = this.onChangeFilterValue.bind(this);
    this.startTask = this.startTask.bind(this);
    this.pauseTask = this.pauseTask.bind(this);
    this.getActiveTask = this.getActiveTask.bind(this);
  }

  startTask(task: Task) {
    clearTimeout(this.state.timeout);
    this.setState(
      {activeTask: task.id, timeout: null},
      () => {
        const activity: Activity = {
          id: uuid(),
          taskId: task.id,
          beginDate: moment().toString()
        };
        const activities = this.state.activities;
        activities.push(activity);
        this.setState({activities});
        this.trackActivity(activity);
        // - this activity should have no end date so it should be considered
        //   the current/ongoing activity
        // - all the other activities for a task should have their times already
        //   calculated so that we don't parse the time spent for each of them
        //   continuously
        // - all the seconds should be calculated and displayed in a formatted way
        //   after each second
        // - there should be a chronological list of activities for today which
        //   should show how much time was spent for each activity
        // - ...
      });
  }

  pauseTask(task: Task) {
    const activity = this.getCurrentActivity();
    activity.endDate = moment().toString();
    const activities = this.state.activities;
    clearTimeout(this.state.timeout);
    this.setState({activeTask: '', timeout: null, activities});
  }

  trackActivity(activity: Activity) {
    const start = moment(activity.beginDate);
    const end = moment();
    const elapsed = moment.duration(end.diff(start));
    const activeTask = this.getActiveTask();

    activeTask.timeSpent = elapsed;

    this.setState({tasks: this.state.tasks});

    this.state.timeout = global.setTimeout(
      () => {
        this.trackActivity(activity);
      },
      1000
    );
  }

  getActiveTask(): Task {
    return this.state.tasks.filter(t => t.id === this.state.activeTask)[0];
  }

  getCurrentActivity(): Activity {
    const ongoingActivities = this.state.activities.filter(a => !a.endDate);
    if (ongoingActivities.length > 1) {
      console.error('more than one ongoing activities');
    }
    console.log('ongoing activities', ongoingActivities);
    return ongoingActivities[0];
  }

  onChangeFilterValue(value: string) {
    this.setState({filterValue: value});
  }

  addTask(e: FormEvent<Form>) {
    e.preventDefault();
    const name = this.state.filterValue;
    if (name === '') {
      return;
    }
    if (this.state.tasks.filter(t => t.name === name).length) {
      return;
    }
    const tasks = this.state.tasks;
    tasks.push({
      id: uuid(),
      name: name
    });
    this.setState({filterValue: '', tasks});
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.addTask}>
          <FormControl
            type="text"
            placeholder="Add or search for a task.."
            value={this.state.filterValue}
            onChange={(e: MyFormEvent<FormControl>) => this.onChangeFilterValue(e.target.value)}
          />
        </Form>
        <TasksList
          tasks={this.state.tasks}
          activeTask={this.state.activeTask}
          startTask={this.startTask}
          pauseTask={this.pauseTask}
        />
      </div>
    );
  }
}

export default ActivitiesPage;
