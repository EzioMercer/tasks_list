import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addTask} from '../../../Redux/Tasks/tasksAction';

export default function AddingTasksForm() {

	const dispatch = useDispatch();

	const sortField = useSelector(state => state.tasksReducer).sort_field;
	const sortDirection = useSelector(state => state.tasksReducer).sort_direction;
	const page = useSelector(state => state.tasksReducer).page;

	return (
		<div>
			ДОБАВЛЕНИЕ НОВОЙ ЗАДАЧИ
			<form onSubmit={(event) => {
				const inputs = event.target.elements;

				dispatch(addTask(inputs.username.value, inputs.email.value, inputs.text.value, sortField, sortDirection, page));
				event.preventDefault();
			}}>
				<input type="text"
					   placeholder='username'
				/>
				<br/>
				<input type="text"
					   placeholder='email'
				/>
				<br/>
				<input type="text"
					   placeholder='text'
				/>
				<br/>
				<input type="submit" value='ADD TASK'/>
			</form>
		</div>
	)
}
