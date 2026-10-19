import { configureStore, createSlice } from "@reduxjs/toolkit";

// ✅ Local Storage Helpers
const loadCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage", error);
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage", error);
  }
};

// ✅ Products Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    Tiffins: [
      { id: 1, name: 'Idli', price: 40, imageurl: '/imgs/idli.jpg' },
      { id: 2, name: 'Dosa', price: 60, imageurl: '/imgs/dosa.jpg' },
      { id: 3, name: 'Poori', price: 50, imageurl: '/imgs/poori.jpg' },
      { id: 4, name: 'Chapati', price: 50, imageurl: '/imgs/chapati.jpg' },
      { id: 5, name: 'Upma', price: 60, imageurl: '/imgs/upma.jpg' },
      { id: 6, name: 'Vada', price: 40, imageurl: '/imgs/vada.jpg' },
      { id: 7, name: 'Pesarattu', price: 40, imageurl: '/imgs/pesarattu.jpg' },
      { id: 8, name: 'Bonda', price: 50, imageurl: '/imgs/bonda.jpg' },
      { id: 9, name: 'Bread Jam', price: 60, imageurl: '/imgs/breadjam.jpg' },
      { id: 10, name: 'Omelette', price: 70, imageurl: '/imgs/omelette.jpg' },
      { id: 11, name: 'Fruits', price: 80, imageurl: '/imgs/fruit.jpg' },
      { id: 12, name: 'Oat Meal', price: 100, imageurl: '/imgs/oat.jpg' },
    ],
    Veg: [
      { id: 101, name: 'Paneer Tikka', price: 150, imageurl: '/imgs/paneertikka.jpg' },
      { id: 102, name: 'Veg Fried Rice', price: 90, imageurl: '/imgs/vegfried.jpg' },
      { id: 103, name: 'Veg Manchurian', price: 120, imageurl: '/imgs/vegmanch.jpg' },
      { id: 104, name: 'Veg Biryani', price: 220, imageurl: '/imgs/vegbiryani.jpg' },
      { id: 106, name: 'Sambar Rice', price: 100, imageurl: '/imgs/sambarrice.jpg' },
      { id: 109, name: 'Dal Rice', price: 110, imageurl: '/imgs/dalrice.jpg' },
      { id: 110, name: 'Potato Curry', price: 80, imageurl: '/imgs/potatocurry.jpg' },
      { id: 111, name: 'Palak Paneer', price: 170, imageurl: '/imgs/palakpaneer.jpg' },
      { id: 112, name: 'Ladyfinger Curry', price: 80, imageurl: '/imgs/ladyfinger.jpg' },
      { id: 113, name: 'Brinjal Curry', price: 80, imageurl: '/imgs/brinjalcurry.jpg' },
      { id: 114, name: 'Mint Chutney', price: 60, imageurl: '/imgs/mintchutney.jpg' },
      { id: 115, name: 'Curd rice', price: 70, imageurl: '/imgs/curdrice.jpg' },
    ],
    NonVeg: [
      { id: 201, name: 'Chicken Biryani', price: 120, imageurl: '/imgs/chickbi.jpg' },
      { id: 202, name: 'Mutton Biryani', price: 340, imageurl: '/imgs/mutbi.jpg' },
      { id: 203, name: 'Mutton Curry', price: 200, imageurl: '/imgs/mutcu.jpg' },
      { id: 204, name: 'Chicken Curry', price: 100, imageurl: '/imgs/chickcu.jpg' },
      { id: 205, name: 'Chicken Fried Rice', price: 110, imageurl: '/imgs/chifriri.jpg' },
      { id: 206, name: 'Crispy Chicken Fry', price: 120, imageurl: '/imgs/crchifry.jpg' },
      { id: 207, name: 'Crispy Prawn Fry', price: 160, imageurl: '/imgs/crprawn.jpg' },
      { id: 208, name: 'Egg Fried rice', price: 100, imageurl: '/imgs/egfryri.jpg' },
      { id: 209, name: 'Fish Fry', price: 160, imageurl: '/imgs/fishfry.jpg' },
      { id: 210, name: 'Omelette', price: 60, imageurl: '/imgs/omelette.jpg' },
      { id: 211, name: 'Prawn Curry', price: 200, imageurl: '/imgs/prawn.jpg' },
      { id: 212, name: 'Hyderabad Biryani', price: 180, imageurl: '/imgs/hybi.jpg' },
    ],
    Juice: [
      { id: 301, name: 'Avacado Juice', price: 150, imageurl: '/imgs/av.jpg' },
      { id: 302, name: 'Blackberry Juice', price: 125, imageurl: '/imgs/blbe.jpg' },
      { id: 303, name: 'Blackcurrant Milkshake', price: 130, imageurl: '/imgs/blcu.jpg' },
      { id: 304, name: 'Lemon Juice', price: 80, imageurl: '/imgs/le.jpg' },
      { id: 305, name: 'Mango Juice', price: 130, imageurl: '/imgs/manju.jpg' },
      { id: 306, name: 'Apple Juie', price: 160, imageurl: '/imgs/apple.jpg' },
      { id: 307, name: 'Strawberry Juice', price: 140, imageurl: '/imgs/straw.jpg' },
      { id: 308, name: 'Coconut Juice', price: 130, imageurl: '/imgs/coco.jpg' },
      { id: 309, name: 'Mint Juice', price: 80, imageurl: '/imgs/mintju.jpg' },
      { id: 310, name: 'Kiwi Juice', price: 150, imageurl: '/imgs/kiwi.jpg' },
      { id: 311, name: 'Chocolate Shake', price: 250, imageurl: '/imgs/choco.jpg' },
      { id: 312, name: 'Watermelon Juice', price: 80, imageurl: '/imgs/water.jpg' },
    ],
  },
  reducers: {}
});

// ✅ Cart Slice with localStorage support
const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(), // 👈 Load from localStorage
  reducers: {
    addToCart: (state, action) => {
      const item = state.find(i => i.name === action.payload.name);
      if (item) {
        item.Quantity += 1;
      } else {
        state.push({ ...action.payload, Quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item) item.Quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item && item.Quantity > 1) {
        item.Quantity -= 1;
      } else {
        return state.filter(i => i.id !== action.payload);
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(i => i.id !== action.payload);
    }
  }
});

// ✅ Store Configuration
const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer
  }
});

// ✅ Persist cart to localStorage on every change
store.subscribe(() => {
  localStorage.setItem("cart",JSON.stringify(store.getState().cart));
});

// ✅ Export Actions and Store
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart
} = cartSlice.actions;

export default store;
