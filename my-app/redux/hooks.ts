import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootStore, AppDispatch } from './configureStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;