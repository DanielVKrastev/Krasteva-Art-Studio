const CART_KEY = 'cart';

export const saveCartData = (cartData) => {
    localStorage.setItem(CART_KEY, JSON.stringify({ items: cartData }));
};

export const getCartData = () => {
    try {
        const raw = localStorage.getItem(CART_KEY);
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.items)) {
            return { items: parsed.items };
        }
        return { items: [] };
    } catch (e) {
        return { items: [] };
    }
};

export const addItemInCart = (item) => {
    const { items } = getCartData();

    if (!item?.id) {
        console.warn('Добавен item без id:', item);
        return { items };
    }

    const exists = items.find(i => i.id === item.id);
    if (!exists) {
        const updatedItems = [...items, item];
        saveCartData(updatedItems);
        return { items: updatedItems };
    }

    return { items };
};

export const removeItemFromCart = (id) => {
    const { items } = getCartData();
    const updatedItems = items.filter(item => item.id !== id);
    saveCartData(updatedItems);
    return { items: updatedItems };
};

export const clearCartData = () => {
    localStorage.removeItem(CART_KEY);
};
