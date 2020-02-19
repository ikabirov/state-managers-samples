import { Store, ActionCreator, PayloadActionCreator, declareAction, declareAtom } from "@reatom/core";
import { ListType } from "../../common/list";
import { apiAtom } from "./todoApi";

let counter = 0

/** @type {ActionCreator} */
const addTodo = declareAction()

/** @type {PayloadActionCreator<string>} */
const removeItemStarted = declareAction()
/** @type {PayloadActionCreator<string>} */
const removeItemCompleted = declareAction()
/** @type {PayloadActionCreator<string>} */
const removeItemFailed = declareAction()

/**
 * @param {string} itemId
 * @param {Store} store
 */
async function removeItemImpl(itemId, store) {
	store.dispatch(
		removeItemStarted(itemId)
	)

	const api = store.getState(apiAtom)
	const itemRemoved = await api.canRemoveItem(itemId)

	if (itemRemoved)
	{
		store.dispatch(
			removeItemCompleted(itemId)
		)
	}
	else
	{
		store.dispatch(
			removeItemFailed(itemId)
		)
	}
}
const removeItem = declareAction(removeItemImpl)

const todoListAtom = declareAtom(/** @type {ListType} */([]), on => [
	on(addTodo, state => {
		const res = [...state, {
			id: `id${counter}`,
			name: `Task #${counter}`
		}]
		counter++
		return res
	}),
	on(removeItemCompleted, (state, payload) => state.filter(v => v.id !== payload))
])

export {
	addTodo,
	todoListAtom,

	removeItemStarted,
	removeItemCompleted,
	removeItemFailed,
	removeItem,
}
