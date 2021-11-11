import { useContext } from 'react';
import { StoreContext } from '../store/provider/Provider';
import RootStore from '../store/rootStore/Store';

export const useStore = (): RootStore => useContext(StoreContext);
