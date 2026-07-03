import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (err) {
            console.error('Error loading cart:', err);
            return [];
        }
    });

    const [wishlistItems, setWishlistItems] = useState(() => {
        try {
            const savedWishlist = localStorage.getItem('wishlist');
            return savedWishlist ? JSON.parse(savedWishlist) : [];
        } catch (err) {
            console.error('Error loading wishlist:', err);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                const newQty = product.qty === -1 ? existing.qty - 1 : existing.qty + (product.qty || 1);
                if (newQty <= 0) {
                    return prev.filter(item => item._id !== product._id);
                }
                return prev.map(item => item._id === product._id ? { ...item, qty: newQty } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item._id !== id));
    };

    const clearCart = () => setCartItems([]);

    const addToWishlist = (product) => {
        setWishlistItems(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) return prev;
            return [...prev, product];
        });
    };

    const removeFromWishlist = (id) => {
        setWishlistItems(prev => prev.filter(item => item._id !== id));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            wishlistItems,
            addToCart, 
            removeFromCart, 
            clearCart, 
            addToWishlist,
            removeFromWishlist,
            totalPrice 
        }}>
            {children}
        </CartContext.Provider>
    );
};
