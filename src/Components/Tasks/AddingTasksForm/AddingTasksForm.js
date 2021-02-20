import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTask} from '../../../Redux/Tasks/tasksAction';

export default function AddingTasksForm() {

	const dispatch = useDispatch();

	const taskState = useSelector(state => state.tasksReducer);

	const handleSubmit = event => {
		const inputs = event.target.elements;

		dispatch(addTask(inputs.username.value, inputs.email.value, inputs.text.value, taskState.sort_field, taskState.sort_direction, taskState.page));

		event.preventDefault();
	};

	return (
		<div>
			ДОБАВЛЕНИЕ НОВОЙ ЗАДАЧИ
			<form onSubmit={handleSubmit}>
				<input type="text"
					   name='username'
					   placeholder='username'
				/>
				<br/>
				<input type="text"
					   name='email'
					   placeholder='email'
				/>
				<br/>
				<input type="text"
					   name='text'
					   placeholder='text'
				/>
				<br/>
				<input type="submit" value='ADD TASK'/>
			</form>
		</div>
	)
}
