import {useDispatch} from 'react-redux';
import {
	API_ADD_TASK,
	API_EDIT_TASK,
	API_LIST_OF_TASKS,
	MUST_BE_FILLED,
	STATUS_OK,
	WRONG_EMAIL
} from '../../enviroments';
import {logout} from '../Login/loginAction';

export const SET_TASKS = 'SET_TASKS';

function setTasksList(data) {
	return {
		type: SET_TASKS,
		payload: data
	}
}

export function getTasksList(sortField = 'id', sortDirection = 'asc', page = 1) {
	return (dispatch = useDispatch()) => {
		(async () => {
			try {
				let response = await fetch(API_LIST_OF_TASKS +
					`&sort_field=${sortField}` +
					`&sort_direction=${sortDirection}` +
					`&page=${page}`, {
					method: 'GET'
				});

				if(response.ok) {

					let json = await response.json();

					dispatch(setTasksList({
						...json.message,
						sort_field: sortField,
						sort_direction: sortDirection,
						page: page
					}));

				} else {
					console.log('(GET TASKS) HTTP Error: ' + response.status);
				}

			} catch (e) {
				console.log(e);
			}
		})()
	}
}

export function addTask(username, email, text, sortField, sortDirection, page) {
	return (dispatch = useDispatch()) => {
		(async () => {

			const body = new FormData();

			body.append('username', username);
			body.append('email', email);
			body.append('text', text);

			try {
				let response = await fetch(API_ADD_TASK, {
					method: 'POST',
					headers: {
						'Accept': 'multipart/form-data'
					},
					body: body
				});

				if(response.ok) {

					let json = await response.json();

					if(json.status === STATUS_OK) {
						alert('Успешно добавлено');
						dispatch(getTasksList(sortField, sortDirection, page));
					} else {
						let message = json.message;

						if(message.username === MUST_BE_FILLED()) alert(MUST_BE_FILLED('username'));
						if(message.email === WRONG_EMAIL) alert(WRONG_EMAIL);
						else if(message.email === MUST_BE_FILLED()) alert(MUST_BE_FILLED('email'));
						if(message.text === MUST_BE_FILLED()) alert(MUST_BE_FILLED('text'));
					}

				} else {
					console.log('(POST ADD TASK) HTTP Error: ' + response.status);
				}

			} catch (e) {
				console.log(e);
			}
		})()
	}
}

export function editTask(id, status, text, token, sortField, sortDirection, page) {
	return (dispatch = useDispatch()) => {
		(async () => {

			const body = new FormData();

			body.append('status', status);
			body.append('text', text);
			body.append('token', token);

			try {
				let response = await fetch(API_EDIT_TASK(id), {
					method: 'POST',
					headers: {
						'Accept': 'multipart/form-data'
					},
					body: body
				});

				if(response.ok) {

					let json = await response.json();

					if(json.status === STATUS_OK) dispatch(getTasksList(sortField, sortDirection, page));
					else if(json.message.token) {
						alert('Вы не авторизованы');
						dispatch(logout());
					}

				} else {
					console.log('(POST EDIT TASK) HTTP Error: ' + response.status);
				}

			} catch (e) {
				console.log(e);
			}
		})()
	}
}
