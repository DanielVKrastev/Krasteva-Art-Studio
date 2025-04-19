export const saveCartData = (cartData) => {
    localStorage.setItem('items', JSON.stringify(cartData));
}

export const getCartData = () => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    
    return {
        items,
    }
}

export const addItemInCart = (item) => {
    const { items } = getCartData();

    const exists = items.find(i => i.id === item.id);
    if (!exists) {
        const updatedItems = [...items, item];
        saveCartData(updatedItems);
        return { items: updatedItems };
    }

    return { items };
}

export const removeItemFromCart = (id) => {
    const { items } = getCartData();

    const updatedItems = items.filter(item => item.id !== id);

    saveCartData(updatedItems);

    return { items: updatedItems };
}


export const clearCartData = () => {
    localStorage.removeItem('items');
}