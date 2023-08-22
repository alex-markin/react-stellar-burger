
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux'
import type { RootState, AppDispatch } from '../services/store'

type DispatchFunc = () => AppDispatch
export const useDispatch: DispatchFunc = dispatchHook
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook