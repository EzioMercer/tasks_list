import {LOGIN, LOGOUT} from './loginAction';

const INITIAL_STATE = localStorage.getItem('token') || null;

function loginReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOGIN:
			localStorage.setItem('token', action.payload);
			return action.payload;
		case LOGOUT:
			localStorage.removeItem('token');
			return null;
		default:
			return state;
	}
}

export default loginReducer;
