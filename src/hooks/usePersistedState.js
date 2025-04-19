import { useState } from "react";
import { addItemInCart, clearCartData, getCartData, removeItemFromCart } from "../utils/cartManage"

export default function usePersistedState(initialState) {
    const [state, setState] = useState(() => {
        const persistedState = getCartData();
        if(!persistedState){
            return initialState;
        }

        return persistedState;
    });

    const setPersistedState = (data) => {
        if(data){
            addItemInCart(data);
            setState(getCartData());
        }else{
            clearCartData();
            setState(initialState);
        }

        setState(data);
    }

    const removePersistedItem = (id) => {
        const updatedState = removeItemFromCart(id);
        setState(updatedState);
    };

    return [
        state,
        setPersistedState,
        removePersistedItem
    ];
}