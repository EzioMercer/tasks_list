import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editTask} from '../../../Redux/Tasks/tasksAction';
import styles from './TaskStyle.module.scss';

function parseStatus(status) {

	switch (status) {
		case 0:
			return {
				done: false,
				edited: false
			};
		case 1:
			return {
				done: false,
				edited: true
			};
		case 10:
			return {
				done: true,
				edited: false
			};
		case 11:
			return {
				done: true,
				edited: true
			};
	}
}

export default function Task(props) {

	const token = useSelector(state => state.loginReducer);
	const sortField = useSelector(state => state.tasksReducer).sort_field;
	const sortDirection = useSelector(state => state.tasksReducer).sort_direction;
	const page = useSelector(state => state.tasksReducer).page;
	const dispatch = useDispatch();

	const task = props.task;
	const parsedStatus = parseStatus(task.status);

	const [showEditForm, setShowEditForm] = useState(false);
	const form_identification = `editTask_${task.id}`;

	const handleSubmit = (event) => {
		setShowEditForm(false);
		const inputs = event.target.elements;

		const completeStatus = inputs.isDone.checked ? '1' : '0';
		const editedStatus = inputs.text.value !== task.text || task.status === 1 || task.status === 11 ?  '1' : '0';

		dispatch(editTask(task.id, +(completeStatus + editedStatus), inputs.text.value, token, sortField, sortDirection, page));
	};

	return (
		<tr>
			<td>{task.username}</td>
			<td>{task.email}</td>
			<td>
				{
					showEditForm ?
						<>
							<form id={form_identification} onSubmit={(event) => handleSubmit(event)}/>
							<textarea name='text' className={styles.new_text} form={form_identification} defaultValue={task.text}/>
						</>:
						task.text
				}
			</td>
			<td>
				{
					showEditForm ?
						<label htmlFor="">
							<input name='isDone' type="checkbox" form={form_identification} defaultChecked={parsedStatus.done}/>
							Done
						</label> :
						parsedStatus.done ? 'Done' : 'Not done'
				}
				<br/>
				{parsedStatus.edited ? 'Edited' : ''}
			</td>
			<td>
				{
					showEditForm ?
						<input type='submit' form={form_identification} value='CONFIRM'/> :
						<button onClick={() => setShowEditForm(true)}>EDIT</button>
				}
			</td>
		</tr>
	);
}
