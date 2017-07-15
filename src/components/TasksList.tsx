import * as React from 'react';
import Task from '../types/task';
import { ListGroup } from 'react-bootstrap';
import TaskComponent from './TaskComponent';
import './TasksList.css';

type Props = {
  tasks: Array<Task>,
  startTask: Function,
  pauseTask: Function,
  activeTask: string
};

class TasksList extends React.Component<{}, {}> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ListGroup componentClass="ul" className="TasksList">
        {this.props.tasks.map(task =>
          <TaskComponent
            key={task.id}
            task={task}
            active={task.id === this.props.activeTask}
            onClickPlay={(t: Task) => this.props.startTask(t)}
            onClickPause={(t: Task) => this.props.pauseTask(t)}
          />
        )}
      </ListGroup>
    );
  }
}

export default TasksList;
