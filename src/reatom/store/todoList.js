import { ActionCreator, declareAction, declareAtom } from "@reatom/core";
import { ListType } from "../../common/list";
import { apiAtom } from "./todoApi";
import { declareAsyncAction } from "../core/declareAsyncAction";

let counter = 0

/** @type {ActionCreator} */
const addTodo = declareAction()

const removeItem = declareAsyncAction(
	/**
	 * @param {string} payload
	 */
	async (payload, store) => {
		const api = store.getState(apiAtom)
		const success = await api.canRemoveItem(payload)

		return {
			success,
			data: payload,
		}
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
	on(removeItem.completed, (state, payload) => state.filter(v => v.id !== payload))
])

export {
	addTodo,
	todoListAtom,
	removeItem,
}
