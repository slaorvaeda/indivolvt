import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      checkoutStep: 'cart', // 'cart' | 'checkout' | 'success'
      lastOrder: null,

      openCart: () => set({ isCartOpen: true, checkoutStep: 'cart' }),
      closeCart: () => set({ isCartOpen: false, checkoutStep: 'cart' }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setCheckoutStep: (step) => set({ checkoutStep: step }),
      setLastOrder: (order) => set({ lastOrder: order }),

      // Add product to cart (or increment quantity if already exists)
      addToCart: (product, quantity = 1, autoOpen = true) => {
        const currentCart = get().cart;
        const variantKey = product.selectedVariant || '';
        const cartItemId = `${product.id}-${variantKey || 'default'}`;

        const existingItem = currentCart.find((item) => (item.cartItemId || item.id) === cartItemId);

        let newCart;
        if (existingItem) {
          newCart = currentCart.map((item) =>
            (item.cartItemId || item.id) === cartItemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newCart = [
            ...currentCart,
            {
              ...product,
              cartItemId,
              quantity,
              image: product.image || product.imageUrl || '/catogeries/fan.png',
            },
          ];
        }

        set({
          cart: newCart,
          isCartOpen: autoOpen ? true : get().isCartOpen,
          checkoutStep: 'cart',
        });
      },

      // Remove product from cart
      removeFromCart: (cartItemId) => {
        set({
          cart: get().cart.filter((item) => (item.cartItemId || item.id) !== cartItemId),
        });
      },

      // Update quantity of an item
      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            (item.cartItemId || item.id) === cartItemId ? { ...item, quantity } : item
          ),
        });
      },

      // Clear entire cart
      clearCart: () => set({ cart: [], lastOrder: null, checkoutStep: 'cart' }),

      // Get total item count in cart
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + (item.quantity || 1), 0);
      },

      // Get total cost of items in cart
      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + (Number(item.price) || 0) * (item.quantity || 1),
          0
        );
      },
    }),
    {
      name: 'indivolt-cart-storage',
      partialize: (state) => ({ cart: state.cart, lastOrder: state.lastOrder }),
    }
  )
);
