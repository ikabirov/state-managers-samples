import {declareAtom} from '@reatom/core'
import {connector} from '../../common/connector'

export const API = Symbol('api')
export const apiAtom = declareAtom(API, connector, () => [])
