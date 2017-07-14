import * as React from 'react';
import { FormEvent } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import TasksList from './components/TasksList';
import Task from './types/task';
import './bootstrap/css/bootstrap.min.css';
import './bootstrap/css/bootstrap-theme.min.css';
import './TimeTracker.css';

type Props = {};
type State = {
  tasks: Array<Task>,
  filterValue: string
};

interface MyEventTarget extends EventTarget {
  value: string;
}

interface MyFormEvent<T> extends React.FormEvent<T> {
  target: MyEventTarget;
}

const defaultTasks = [
  {id: '1', name: 'Task 1'},
  {id: '2', name: 'Task 2'}
];

class TimeTracker extends React.Component<{}, {}> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      tasks: defaultTasks,
      filterValue: ''
    };

    this.onChangeFilterValue = this.onChangeFilterValue.bind(this);
    this.addTask = this.addTask.bind(this);
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

  onChangeFilterValue(value: string) {
    this.setState({filterValue: value});
  }

  render() {
    return (
      <div id="main">
        <Form onSubmit={this.addTask}>
          <FormControl
            type="text"
            placeholder="Add or search for a task.."
            value={this.state.filterValue}
            onChange={(e: MyFormEvent<FormControl>) => this.onChangeFilterValue(e.target.value)}
          />
        </Form>
        <TasksList tasks={this.state.tasks} />
      </div>
    );
  }
}

export default TimeTracker;
