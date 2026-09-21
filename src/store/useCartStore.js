import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      // Add product to cart (or increment quantity if already exists)
      addToCart: (product, quantity = 1) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            cart: [...currentCart, { ...product, quantity }],
          });
        }
      },
      
      // Remove product from cart
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.id !== productId),
        });
      },
      
      // Update quantity of an item
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      
      // Clear entire cart
      clearCart: () => set({ cart: [] }),
      
      // Get total item count in cart
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + (item.quantity || 1), 0);
      },
      
      // Get total cost of items in cart
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
      },
    }),
    {
      name: 'indivolt-cart-storage', // unique key in localStorage
    }
  )
);
