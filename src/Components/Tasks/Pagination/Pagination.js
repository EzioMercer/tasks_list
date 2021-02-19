import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTasksList} from '../../../Redux/Tasks/tasksAction';

export default function Pagination() {

	const dispatch = useDispatch();

	const sortField = useSelector(state => state.tasksReducer).sort_field;
	const sortDirection = useSelector(state => state.tasksReducer).sort_direction;
	const totalTaskCount = useSelector(state => state.tasksReducer).total_task_count;

	const totalPagesCount = Math.ceil(totalTaskCount / 3);
	const [page, setPage] = useState(1);

	useEffect(() => {
		dispatch(getTasksList(sortField, sortDirection, page));
	}, [page]);

	return(
		<div>
			<button onClick={() => {
				setPage(1);
			}}>{'<<'}</button>
			<button onClick={() => {
				const nextPage = page - 1;
				setPage(nextPage <= 1 ? 1 : nextPage);
				setPage(1);
			}}>{'<'}</button>
			<span>{page}/{totalPagesCount}</span>
			<button onClick={() => {
				const nextPage = page + 1;
				setPage(nextPage >= totalPagesCount ? totalPagesCount : nextPage);
			}}>{'>'}</button>
			<button onClick={() => {
				setPage(totalPagesCount);
			}}>{'>>'}</button>
		</div>
	)
}
