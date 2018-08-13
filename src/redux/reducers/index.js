import { combineReducers } from 'redux';
import tasks from './tasks';
let indexReducer = combineReducers({tasks});
export default indexReducer;