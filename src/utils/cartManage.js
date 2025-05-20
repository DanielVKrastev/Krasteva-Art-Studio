// Check if sessionStorage is available
const isStorageAvailable = (() => {
    try {
        const test = '__storage_test__';
        sessionStorage.setItem(test, test);
        sessionStorage.removeItem(test);
        return true;
    } catch {
        return false;
    }
})();

// If sessionStorage is false, fallback with in-memory object
const storage = isStorageAvailable
    ? sessionStorage
    : {
        _data: {},
        setItem(key, value) { this._data[key] = value; },
        getItem(key) { return this._data.hasOwnProperty(key) ? this._data[key] : null; },
        removeItem(key) { delete this._data[key]; },
    };

const STORAGE_KEY = 'items';

export const saveCartData = (cartData) => {
     try {
        storage.setItem(STORAGE_KEY, JSON.stringify(cartData));
    } catch (error) {
        console.warn("Failed to save cart data:", error);
    }
};

export const getCartData = () => {
    try {
        const items = JSON.parse(storage.getItem(STORAGE_KEY)) || [];
        return { items };
    } catch (error) {
        console.warn("Failed to get cart data:", error);
        return { items: [] };
    }
};

export const addItemInCart = (item) => {
    const { items } = getCartData();

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
    try {
        storage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.warn("Failed to clear cart data:", e);
    }
};
