import React from 'react';
import Tasks from '../../Components/Tasks/Tasks';
import Login from '../../Components/Login/Login';
import AddingTasksForm from '../../Components/Tasks/AddingTasksForm/AddingTasksForm';

export default function Home() {
	return (
		<div>
			<Login/>
			<br/>
			<AddingTasksForm/>
			<br/>
			<Tasks/>
		</div>
	)
}
