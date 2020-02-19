import React, {useEffect} from 'react'
import './ReatomApp.css'
import { createStore, declareAtom, declareAction } from "@reatom/core";
import { useAtom, useAction, context } from "@reatom/react";
import { todoAtom, titleAtom, setTitle} from './store/todo.js';
import { todoListAtom, addTodo, removeItem} from './store/todoList.js';
import { TodoItem } from './TodoItem';

const clearError = declareAction()
const errorAtom = declareAtom('', on => [
	on(removeItem.failed, (_, payload) => `can't remove item: ${payload}`),
	on(clearError, () => '')
])

function ReatomAppImpl() {
	const title = useAtom(titleAtom)
	const handleSetTitle = useAction(setTitle)

	const error = useAtom(errorAtom)
	const handleClearError = useAction(clearError)

	useEffect(() => {
		setTimeout(() => {
			handleSetTitle('hello world!')
		}, 5000)
	}, [handleSetTitle])

	const list = useAtom(todoListAtom)
	const handleAddItem = useAction(addTodo)

	return (
<div className="Reatom">
	<div onClick={handleClearError}>{error || 'No errors'}</div>
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
	const savedState = localStorage.getItem("app_store")
	const state = savedState
		? JSON.parse(savedState)
		: undefined

	const store = createStore(todoAtom, state)

	store.subscribe(todoAtom, state => {
		localStorage.setItem("app_store", JSON.stringify(store.getState()))
	})

	return (
<context.Provider value={store}>
	{<ReatomAppImpl></ReatomAppImpl>}
</context.Provider>
);
}

export default ReatomApp;
