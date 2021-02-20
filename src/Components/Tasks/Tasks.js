import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTasksList} from '../../Redux/Tasks/tasksAction';
import Task from './Task/Task';
import styles from './TasksStyle.module.scss';
import Pagination from './Pagination/Pagination';

export default function Tasks() {

	const dispatch = useDispatch();

	const taskState = useSelector(state => state.tasksReducer);
	const tasksList = taskState.tasks;
	const page = taskState.page;

	return (
		<div>
			<Pagination/>
			<table className={styles.tasks}>
				<tr>
					<th>
						Username
						<button onClick={() => dispatch(getTasksList('username', 'asc', page))}>{'🠕'}</button>
						<button onClick={() => dispatch(getTasksList('username', 'desc', page))}>{'🠗'}</button>
					</th>
					<th>
						Email
						<button onClick={() => dispatch(getTasksList('email', 'asc', page))}>{'🠕'}</button>
						<button onClick={() => dispatch(getTasksList('email', 'desc', page))}>{'🠗'}</button>
					</th>
					<th>text</th>
					<th>
						Status
						<button onClick={() => dispatch(getTasksList('status', 'asc', page))}>{'🠕'}</button>
						<button onClick={() => dispatch(getTasksList('status', 'desc', page))}>{'🠗'}</button>
					</th>
					<th>Action</th>
				</tr>
				{tasksList.map(task => <Task task={task}/>)}
			</table>
		</div>
	)
}
