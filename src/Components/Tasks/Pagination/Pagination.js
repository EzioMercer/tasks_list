import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTasksList} from '../../../Redux/Tasks/tasksAction';

export default function Pagination() {

	const dispatch = useDispatch();

	const taskState = useSelector(state => state.tasksReducer);
	const totalTaskCount = taskState.total_task_count;
	const page = taskState.page;

	const totalPagesCount = Math.ceil(totalTaskCount / 3);

	const onPageChange = (page, changeType) => {
		let nextPage;

		switch (changeType) {
			case 'inc':
				nextPage = page >= totalPagesCount ? totalPagesCount : page
				break;
			case 'dec':
				nextPage = page <= 1 ? 1 : page;
				break;
			default:
				nextPage = page;
		}

		dispatch(getTasksList(taskState.sort_field, taskState.sort_direction, nextPage));
	};

	useEffect(() => {
		onPageChange(page);
	}, []);

	return(
		<div>
			<button onClick={() => onPageChange(1)}>{'<<'}</button>
			<button onClick={() => onPageChange(page - 1, 'dec')}>{'<'}</button>
			<span>{page}/{totalPagesCount}</span>
			<button onClick={() => onPageChange(page + 1, 'inc')}>{'>'}</button>
			<button onClick={() => onPageChange(totalPagesCount)}>{'>>'}</button>
		</div>
	)
}
