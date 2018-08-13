// @flow
import { Card } from 'semantic-ui-react';
import React from 'react';
import type { typeTask } from '../../models/structs';

type Props = {
  task: typeTask,
};

const defaultProps = {};

const CurrentTaskCard = (props: Props) => {
  return (
    <Card>
      header={props.task.content}
      description={'time elapsed'}
    </Card>
  );
};
CurrentTaskCard.defaultProps = defaultProps;
export default CurrentTaskCard;
