import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../lib/api';

const CartContext = createContext();

// Flat shipping charge (₹) added once per order.
export const SHIPPING_CHARGE = 30;

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

    // Cart items are saved snapshots, so a price or GST rate changed in the
    // admin since they were added would show stale totals. Refresh them from
    // the server once per visit (the server recomputes the real amount anyway).
    useEffect(() => {
        const ids = cartItems.map((item) => item._id);
        if (ids.length === 0) return;
        let cancelled = false;
        Promise.all(ids.map((id) => api.get(`/api/products/${id}`).then((r) => r.data).catch(() => null)))
            .then((fresh) => {
                if (cancelled) return;
                const byId = Object.fromEntries(fresh.filter(Boolean).map((p) => [p._id, p]));
                setCartItems((prev) => prev.map((item) => {
                    const p = byId[item._id];
                    return p ? { ...item, price: p.price, mrp: p.mrp, gstRate: p.gstRate || 0, stock: p.stock } : item;
                }));
            });
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // `product.qty` is the change in quantity, not the new total: 1 adds one,
    // -1 removes one, 3 adds three. Defaults to 1 when not given.
    const addToCart = (product) => {
        const delta = Number.isInteger(product.qty) && product.qty !== 0 ? product.qty : 1;
        setCartItems(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                const newQty = existing.qty + delta;
                if (newQty <= 0) {
                    return prev.filter(item => item._id !== product._id);
                }
                return prev.map(item => item._id === product._id ? { ...item, qty: newQty } : item);
            }
            if (delta <= 0) return prev;
            return [...prev, { ...product, qty: delta }];
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

    // `totalPrice` is the items subtotal. GST is added per product at its own
    // rate, and shipping is a flat charge per order. Must match
    // buildOrderFromItems() in backend/routes/paymentRoutes.js.
    const round2 = (n) => Math.round(n * 100) / 100;
    const totalPrice = round2(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    const gstTotal = round2(cartItems.reduce((acc, item) => acc + (item.price * item.qty * (Number(item.gstRate) || 0)) / 100, 0));
    const shippingCharge = cartItems.length > 0 ? SHIPPING_CHARGE : 0;
    const grandTotal = round2(totalPrice + gstTotal + shippingCharge);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            wishlistItems,
            addToCart, 
            removeFromCart, 
            clearCart, 
            addToWishlist,
            removeFromWishlist,
            totalPrice,
            gstTotal,
            shippingCharge,
            grandTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};
