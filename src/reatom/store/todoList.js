import { ActionCreator, declareAction, declareAtom } from "@reatom/core";
import { ListType } from "../../common/list";
import { apiAtom } from "./todoApi";
import { createAsyncAction } from "../core/createAsyncAction";

let counter = 0

/** @type {ActionCreator} */
const addTodo = declareAction()

const [removeItem, removeItemEvents] = createAsyncAction(
	/**
	 * @param {string} itemId
	 */
	(itemId, store) => {
		const api = store.getState(apiAtom)
		return api.canRemoveItem(itemId)
	}
)

const todoListAtom = declareAtom(/** @type {ListType} */([]), on => [
	on(addTodo, state => {
		const res = [...state, {
			id: `id${counter}`,
			name: `Task #${counter}`
		}]
		counter++
		return res
	}),
	on(removeItemEvents.completed, (state, payload) => state.filter(v => v.id !== payload))
])

export {
	addTodo,
	todoListAtom,

	removeItem,
	removeItemEvents,
}
