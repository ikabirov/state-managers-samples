import React from 'react'
import { useAction, useAtom } from "@reatom/react"
import { removeItem, removeItemEvents} from "./store/todoList"
import { declareAtom, map } from '@reatom/core'

const disabledAtom = declareAtom(/** @type {{[val: string]: boolean}} */({}), on => [
	on(removeItemEvents.started, (state, id) => ({
		...state,
		[id]: true,
	})),
	on(removeItemEvents.completed, (state, id) => {
		const res = {...state}
		delete res[id]
		return res
	}),
	on(removeItemEvents.failed, (state, id) => ({
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
