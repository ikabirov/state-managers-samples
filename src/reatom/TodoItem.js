import React from 'react'
import { useAction, useAtom } from "@reatom/react"
import { removeItem, removeItemStarted, removeItemCompleted, removeItemFailed } from "./store/todoList"
import { declareAtom, map } from '@reatom/core'

const disabledAtom = declareAtom(/** @type {{[val: string]: boolean}} */({}), on => [
	on(removeItemStarted, (state, id) => ({
		...state,
		[id]: true,
	})),
	on(removeItemCompleted, (state, id) => {
		const res = {...state}
		delete res[id]
		return res
	}),
	on(removeItemFailed, (state, id) => ({
		...state,
		[id]: false,
	})),
])

/**
 * @param {{
 *   item: {
 *     id: string,
 *     name: string,
 *   },
 * }} param0
 */
function TodoItem({item}) {
	const disabled = useAtom(
		map(
			`todo #${item.id} disabled`,
			disabledAtom,
			state => state[item.id] || false
		)
	)

	const removeItemHandler = useAction(removeItem)

	return (
<div>
	<div>id: {item.id}</div>
	<div>name: {item.name}</div>
	<button
		onClick={() => removeItemHandler(item.id)}
		disabled={disabled}
	>Delete</button>
</div>
)
}

export {
	TodoItem,
}
