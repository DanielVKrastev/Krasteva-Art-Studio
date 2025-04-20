import { CartContext } from "../contexts/CartContext";
import useCartState from "../hooks/useCartState";

export default function CartProvider({
    children,
}) {
      const [cart, setCart, removeCart] = useCartState({});

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            removeFromCart: removeCart
        }}>
            {children}
        </CartContext.Provider>
    );
}
