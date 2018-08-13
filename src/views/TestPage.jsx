// @flow
import React from 'react';
import CurrentTasksView from './CurrentTasksView/CurrentTasksView';

/**
 * Page for testing purpose
 */

const TestPage = () => {
  return (
    <div>
      <CurrentTasksView currentTasks={[]} />
    </div>
  );
};

export default TestPage;
