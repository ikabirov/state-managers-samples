import {PayloadActionCreator, Store, declareAction} from '@reatom/core'

/**
 * @param {function(T, Store):Promise<boolean>} handler
 * @return {[
 *   PayloadActionCreator<T>,
 *   {
 *     started: PayloadActionCreator<T>,
 *     completed: PayloadActionCreator<T>,
 *     failed: PayloadActionCreator<T>,
 *   }
 * ]}
 *
 * @template T
 */
function createAsyncAction(handler) {
	/** @type {PayloadActionCreator<T>} */
	const started = declareAction()
	/** @type {PayloadActionCreator<T>} */
	const completed = declareAction()
	/** @type {PayloadActionCreator<T>} */
	const failed = declareAction()

	/**
	 * @param {T} payload
	 * @param {Store} store
	 */
	async function removeItemImpl(payload, store) {
		store.dispatch(
			started(payload)
		)

		const success = await handler(payload, store)

		if (success)
		{
			store.dispatch(
				completed(payload)
			)
		}
		else
		{
			store.dispatch(
				failed(payload)
			)
		}
	}

	const action = declareAction(removeItemImpl)

	return [
		action,
		{
			started,
			completed,
			failed,
		}
	]
}

export {
	createAsyncAction
}
