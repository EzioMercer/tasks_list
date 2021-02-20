import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout} from '../../Redux/Login/loginAction';

export default function Login() {
	const dispatch = useDispatch();
	const isAuthorized = useSelector(state => state.loginReducer) !== null;

	const handleSubmit = event => {
		const inputs = event.target.elements;

		dispatch(login(inputs.username.value, inputs.password.value));

		event.preventDefault();
	};

	return (
		isAuthorized ?
			<div>
				<button onClick={() => dispatch(logout())}>LOG OUT</button>
			</div> :
			<div>
				ВХОД
				<form onSubmit={handleSubmit}>
					<input type='text'
						   name='username'
						   placeholder='username'
					/>
					<br/>
					<input type='password'
						   name='password'
						   placeholder='password'
					/>
					<br/>
					<input type="submit" value='LOGIN'/>
				</form>
			</div>
	);
}
