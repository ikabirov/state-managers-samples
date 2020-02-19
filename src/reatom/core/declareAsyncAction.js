import {PayloadActionCreator, Store, declareAction} from '@reatom/core'

/**
 * @param {function(T, Store):Promise<{
 *   success: true,
 *   data: RESULT,
 * } | {
 *   success: false,
 *   data: ERROR,
 * }>} handler
 * @return {PayloadActionCreator<T> & {
 *   started: PayloadActionCreator<T>,
 *   completed: PayloadActionCreator<RESULT>,
 *   failed: PayloadActionCreator<ERROR>,
 * }}
 *
 * @template T, RESULT, ERROR
 */
function declareAsyncAction(handler) {
	/** @type {PayloadActionCreator<T>} */
	const started = declareAction()
	/** @type {PayloadActionCreator<RESULT>} */
	const completed = declareAction()
	/** @type {PayloadActionCreator<ERROR>} */
	const failed = declareAction()

	/**
	 * @param {T} payload
	 * @param {Store} store
	 */
	async function removeItemImpl(payload, store) {
		store.dispatch(
			started(payload)
		)

		const res = await handler(payload, store)

		if (res.success)
		{
			store.dispatch(
				completed(res.data)
			)
		}
		else
		{
			store.dispatch(
				failed(res.data)
			)
		}
	}

	const action = declareAction(removeItemImpl)
	// @ts-ignore
	action.started = started
	// @ts-ignore
	action.completed = completed
	// @ts-ignore
	action.failed = failed
	// @ts-ignore
	return action
}

export {
	declareAsyncAction,
}
