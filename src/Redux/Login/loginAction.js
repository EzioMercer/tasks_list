import {useDispatch} from 'react-redux';
import {API_LOGIN, MUST_BE_FILLED, STATUS_OK, WRONG_USER_DATA} from '../../enviroments';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

function loginUser(token) {
	return {
		type: LOGIN,
		payload: token
	}
}

function logoutUser() {
	return {
		type: LOGOUT
	}
}

export function login(username, password) {
	return (dispatch = useDispatch()) => {
		(async () => {

			const body = new FormData();

			body.append('username', username);
			body.append('password', password);

			try {
				let response = await fetch(API_LOGIN, {
					method: 'POST',
					headers: {
						'Accept': 'multipart/form-data'
					},
					body: body
				});

				if(response.ok) {

					let json = await response.json();

					if(json.status === STATUS_OK) {
						alert('Успешная авторизация');
						dispatch(loginUser(json.message.token));
					} else {
						let message = json.message;

						if(message.username === MUST_BE_FILLED()) alert(MUST_BE_FILLED('username'));
						if(message.password === MUST_BE_FILLED()) alert(MUST_BE_FILLED('password'));
						if(message.password === WRONG_USER_DATA) alert(WRONG_USER_DATA);
					}

				} else {
					console.log('(POST LOGIN) HTTP Error: ' + response.status);
				}

			} catch (e) {
				console.log(e);
			}
		})()
	}
}

export function logout() {
	return (dispatch = useDispatch()) => {
		dispatch(logoutUser());
	}
}
