import React, {useEffect} from 'react'
import './ReatomApp.css'
import { createStore } from "@reatom/core";
import { useAtom, useAction, context } from "@reatom/react";
import { todoAtom, titleAtom, setTitle} from './store/todo.js';
import { todoListAtom, addTodo, removeItem } from './store/todoList.js';
import { TodoItem } from './TodoItem';

function ReatomAppImpl() {
	const title = useAtom(titleAtom)
	const handleSetTitle = useAction(setTitle)

	const removeItemHandler = useAction(removeItem)
	useEffect(() => {
		setTimeout(() => {
			handleSetTitle('hello world!')
		}, 5000)
	}, [handleSetTitle, removeItemHandler])

	const list = useAtom(todoListAtom)
	const handleAddItem = useAction(addTodo)

	return (
<div className="Reatom">
	<h1>Reatom</h1>
	<div>
		<div>{title}</div>
		<button onClick={handleAddItem}>Add Task</button>
	</div>
	{list.map(item => <TodoItem key={item.id} item={item}/>)}
</div>
);
}

function ReatomApp() {
	const store = createStore(todoAtom)

	store.subscribe(todoAtom, state => {
		console.log(state)
	})

	return (
<context.Provider value={store}>
	{<ReatomAppImpl></ReatomAppImpl>}
</context.Provider>
);
}

export default ReatomApp;
