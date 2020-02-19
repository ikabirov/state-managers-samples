import {combine, declareAction, PayloadActionCreator, declareAtom} from '@reatom/core'
import { todoListAtom } from './todoList'

/** @type {PayloadActionCreator<string>} */
const setTitle = declareAction()

const titleAtom = declareAtom('TODO List', on => [
	on(setTitle, (_, payload) => payload)
])


const todoAtom = combine({
	title: titleAtom,
	items: todoListAtom,
})

export {
	setTitle,
	titleAtom,
	todoAtom,
}
