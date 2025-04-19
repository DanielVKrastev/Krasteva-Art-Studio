export const saveCartData = (cartData) => {
    localStorage.setItem('items', JSON.stringify(cartData));
}

export const getCartData = () => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    console.log(items);
    
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

export const clearCartData = () => {
    localStorage.removeItem('items');
}