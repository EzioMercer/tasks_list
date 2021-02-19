import {SET_TASKS} from './tasksAction';

const INITIAL_STATE = {
	tasks: [],
	total_task_count: 0,
	sort_field: 'id',
	sort_direction: 'asc',
	page: 1
};

function tasksReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case SET_TASKS:
			return {
				...action.payload
			};
		default:
			return state;
	}
}

export default tasksReducer;
