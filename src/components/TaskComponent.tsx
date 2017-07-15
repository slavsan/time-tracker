import * as React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import * as classNames from 'classnames';
import Task from '../types/task';
import 'moment-duration-format';

type Props = {
  task: Task,
  onClickPlay: Function,
  onClickPause: Function,
  active: boolean
};

function TaskComponent({task, active, onClickPlay, onClickPause}: Props) {
  const classes = classNames('list-group-item', {active});

  const playPauseButton = active ? (
    <Button bsSize="xs" onClick={(e) => onClickPause()}>
      <Glyphicon glyph="pause" />
    </Button>
  ) : (
    <Button bsSize="xs" onClick={(e) => onClickPlay(task)}>
      <Glyphicon glyph="play" />
    </Button>
  );

  return (
    <li className={classes}>
      <span>
        {task.name}
      </span>
      <span>
        {task.timeSpent && task.timeSpent.format('HH:mm:ss', {trim: false})}
        {/*{task.timeSpent && task.timeSpent.format('h [hrs], m [min], s [sec]')}*/}
      </span>
      <ButtonGroup>
        {playPauseButton}
      </ButtonGroup>
    </li>
  );
}

export default TaskComponent;
