import { createSlice } from "@reduxjs/toolkit";
// import Cardsdata from "../../Components/CardsData";

const initialState = {
  cart: [],
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const FoodSlice = createSlice({
  name: "all",
  initialState,
  reducers: {
    SETITEMS:(state,action)=>{
    state.items=action.payload;
    },
    ADDTOCART: (state, action) => {
      let find = state.cart.findIndex(
        (items) => items.id === action.payload.id
       
      );
      if (find >= 0) {
        state.cart[find].qnty = state.cart[find].qnty + 1;
      } else {
        state.cart.push(action.payload);
        console.log("ACTION PAYLOAD", action.payload);
      }
      console.log("Find is",find); 
    },
    getCartTotal: (state) => {
      console.log("ddddddddds", state.cart);
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          console.log("carttotal", cartTotal);
          console.log("cartitem", cartItem);
          const { price, qnty } = cartItem;
          console.log("Price are", price, "Quantity are", qnty);
          const itemTotal = price * qnty;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += qnty;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },

    DRECEMENT: (state, action) => {
      
      let find = state.cart.findIndex(
        (items) => items.id === action.payload
        
      );
        console.log("FIND",find);
    
      // if (find >= 0) {
      //   state.cart[find].qnty = state.cart[find].qnty-1;
      // } 
      if(state.cart[find].qnty>1){
           state.cart[find].qnty = state.cart[find].qnty-1;
      }
      else if(state.cart[find].qnty<=1 || state.cart[find].qnty==0){
        state.cart=state.cart.filter((item)=>item.id!==action.payload)
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
 
    REMOVEITEM:(state,action)=>{
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { ADDTOCART, getCartTotal, DRECEMENT,REMOVEITEM,SETITEMS } = FoodSlice.actions;
export default FoodSlice.reducer;