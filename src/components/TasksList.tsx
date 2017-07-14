import * as React from 'react';
import Task from '../types/task';
import { ListGroup } from 'react-bootstrap';
import TaskComponent from './TaskComponent';
import './TasksList.css';

type Props = {
  tasks: Array<Task>
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
            onClickPlay={(t: Task) => console.log('clicked play for task', t.name)}
          />
        )}
      </ListGroup>
    );
  }
}

export default TasksList;
