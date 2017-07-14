import * as React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import Task from '../types/task';

type Props = {
  task: Task,
  onClickPlay: Function
};

function TaskComponent({task, onClickPlay}: Props) {
  return (
    <li className="list-group-item">
        <span>
          {task.name}
        </span>
      <ButtonGroup>
        <Button bsSize="xs" onClick={(e) => onClickPlay(task)}>
          <Glyphicon glyph="play" />
        </Button>
      </ButtonGroup>
    </li>
  );
}

export default TaskComponent;
