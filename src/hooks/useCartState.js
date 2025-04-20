import { useState } from "react";
import { addItemInCart, clearCartData, getCartData, removeItemFromCart } from "../utils/cartManage"

export default function useCartState(initialState) {
    const [state, setState] = useState(() => {
        const { items } = getCartData();

        return items ?? initialState;
    });

    const setPersistedState = (item) => {
        if (item) {
            const updated = addItemInCart(item);
            setState(updated.items);
          } else {
            clearCartData();
            setState([]); 
          }
    }

    const removePersistedItem = (id) => {
        const { items } = removeItemFromCart(id);
        const updatedState = items;
        setState(updatedState);
    };
    
    return [
        state,
        setPersistedState,
        removePersistedItem,
    ];
}