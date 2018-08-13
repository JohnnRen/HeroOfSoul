// @flow
import React from 'react';
import styled from 'styled-components';
import CurrentTaskCard from './CurrentTaskCard';
import type { typeTask } from '../../models/structs';

type Props = {
  currentTasks: Array<typeTask>,
};

const defaultProps = {};
/**
 * A div Wrapper for CurrentTasksView
 */
const CurrentTasksViewWrapper = styled.div``;

/**
 * A view that display current tasks
 */
const CurrentTasksView = (props: Props) => {
  return (
    <CurrentTasksViewWrapper>
      {props.currentTasks.map((task) => (
        <CurrentTaskCard key={task.content} task={task} />
      ))}
    </CurrentTasksViewWrapper>
  );
};
CurrentTasksView.defaultProps = defaultProps;
export default CurrentTasksView;
