import {combineReducers} from 'redux';
import loginReducer from './Login/loginReducer';
import tasksReducer from './Tasks/tasksReducer';

export default combineReducers({
	loginReducer,
	tasksReducer
});
