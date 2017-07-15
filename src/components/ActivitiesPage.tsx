import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { Form, FormControl } from 'react-bootstrap';
import TasksList from './TasksList';
import Task from '../types/task';
import Activity from '../types/activity';
import { FormEvent } from 'react';
import MyFormEvent from '../types/MyFormEvent';

type Props = {
  tasks: Array<Task>,
  activities: Array<Activity>,
  activeTask: string,
  startTask: Function,
  pauseTask: Function
};
type State = {
  filterValue: string,
  interval?: any
};

class ActivitiesPage extends React.Component<{}, {}> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      filterValue: ''
    };

    this.addTask = this.addTask.bind(this);
    this.onChangeFilterValue = this.onChangeFilterValue.bind(this);
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
    if (this.props.tasks.filter(t => t.name === name).length) {
      return;
    }
    const tasks = this.props.tasks;
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
          tasks={this.props.tasks}
          activeTask={this.props.activeTask}
          startTask={this.props.startTask}
          pauseTask={this.props.pauseTask}
        />
      </div>
    );
  }
}

export default ActivitiesPage;
