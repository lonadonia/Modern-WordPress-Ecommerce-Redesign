const CART_KEY = 'temima-prototype-cart-v1';
const QUOTE_KEY = 'temima-prototype-quote-v1';
const CHECKOUT_KEY = 'temima-prototype-checkout-v1';

const read = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const money = (value) => new Intl.NumberFormat('en-US', {
  style: 'currency', currency: 'USD'
}).format(value || 0);

export const getCart = () => read(CART_KEY, []);

export const setCart = (cart) => {
  write(CART_KEY, cart);
  window.dispatchEvent(new CustomEvent('cart:change', { detail: cart }));
  return cart;
};

export const cartCount = () => getCart().reduce((total, item) => total + item.quantity, 0);
export const cartSubtotal = (cart = getCart()) => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

export const addToCart = (item) => {
  const cart = getCart();
  const key = `${item.productId}-${item.sku}-${item.finish}`;
  const existing = cart.find((line) => line.key === key);
  if (existing) existing.quantity += item.quantity || 1;
  else cart.push({ ...item, key, quantity: item.quantity || 1 });
  setCart(cart);
  track('add_to_cart', {
    item_id: item.productId,
    item_name: item.title,
    sku: item.sku,
    value: item.price,
    currency: 'USD',
    quantity: item.quantity || 1
  });
  return cart;
};

export const updateCartLine = (key, updates) => {
  const cart = getCart().map((item) => item.key === key ? { ...item, ...updates } : item);
  return setCart(cart);
};

export const removeCartLine = (key) => setCart(getCart().filter((item) => item.key !== key));
export const clearCart = () => setCart([]);

export const getQuote = () => read(QUOTE_KEY, { step: 1, values: {} });
export const setQuote = (quote) => write(QUOTE_KEY, quote);
export const clearQuote = () => localStorage.removeItem(QUOTE_KEY);

export const getCheckout = () => read(CHECKOUT_KEY, {});
export const setCheckout = (data) => write(CHECKOUT_KEY, data);
export const clearCheckout = () => localStorage.removeItem(CHECKOUT_KEY);

const safeEventData = (data = {}) => {
  const blocked = /email|phone|name|address|zip|note|file|contact/i;
  return Object.fromEntries(Object.entries(data).filter(([key]) => !blocked.test(key)));
};

export const track = (event, data = {}) => {
  const payload = {
    event,
    ...safeEventData(data),
    page_path: window.location.pathname,
    timestamp: new Date().toISOString()
  };
  window.temimaAnalytics = window.temimaAnalytics || [];
  window.temimaAnalytics.push(payload);
  if (import.meta.env.DEV) console.info('[Temima event]', payload);
  window.dispatchEvent(new CustomEvent('analytics:event', { detail: payload }));
};

export const createReference = (prefix) => `${prefix}-${Date.now().toString(36).toUpperCase().slice(-6)}`;
