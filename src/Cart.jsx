import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "./Store.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // stores applied coupon name
  const [selectedDiscount, setSelectedDiscount] = useState(0); // dropdown discount %
  const [email, setEmail] = useState(""); // Email state

  // 💳 Valid coupons
  const coupons = {
    thahira1: 10,
    thahira2: 20,
    thahira3: 30,
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toLowerCase();
    if (appliedCoupon) {
      toast.info("Coupon already applied.", {
        className: "custom-toast-info",
      });
      return;
    }
    if (coupons[code]) {
      setAppliedCoupon(code);
      toast.success(`🎉 Coupon '${code}' applied!`, {
        className: "custom-toast-success",
      });
    } else {
      toast.error("❌ Invalid coupon code.", {
        className: "custom-toast-error",
      });
    }
  };

  const handleIncrement = (id, name) => {
    dispatch(incrementQuantity(id));
    toast.success(` ${name} quantity increased`, {
      position: "top-right",
      autoClose: 2000,
      className: "custom-toast-success",
    });
  };

  const handleDecrement = (id, name, quantity) => {
    if (quantity > 1) {
      dispatch(decrementQuantity(id));
      toast.info(` ${name} quantity decreased`, {
        position: "top-right",
        autoClose: 2000,
        className: "custom-toast-info",
      });
    } else {
      dispatch(removeFromCart(id));
      toast.error(` ${name} removed from cart`, {
        position: "top-right",
        autoClose: 2000,
        className: "custom-toast-error",
      });
    }
  };

  const handleRemove = (id, name) => {
    dispatch(removeFromCart(id));
    toast.error(`❌ ${name} removed from cart`, {
      position: "top-right",
      autoClose: 2000,
      className: "custom-toast-error",
    });
  };

  const handleCheckout = () => {
    if (!email || !email.includes("@")) {
      toast.error("❌ Please enter a valid email address.", {
        className: "custom-toast-error",
      });
      return;
    }

    // You can add further checkout logic here

    toast.success(`✅ Order confirmed for ${email}!`, {
      className: "custom-toast-success",
    });
  };

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        🛒 Your cart is empty
      </h2>
    );
  }

  // 🎯 Calculate subtotal and offers
  let subtotal = 0;
  let juiceDiscount = 0;
  let vegDiscount = 0;
  let comboDiscount = 0;

  let vegTotal = 0;
  let hasChickenBiryani = false;
  let hasCoconutJuice = false;

  cart.forEach((item) => {
    const itemTotal = item.price * item.Quantity;
    subtotal += itemTotal;

    if (item.category === "Veg") {
      vegTotal += itemTotal;
    }

    if (
      item.name.toLowerCase().includes("mango juice") ||
      item.name.toLowerCase().includes("strawberry juice")
    ) {
      const freeQty = Math.floor(item.Quantity / 2);
      juiceDiscount += freeQty * item.price;
    }

    if (item.name.toLowerCase() === "chicken biryani") hasChickenBiryani = true;
    if (item.name.toLowerCase() === "coconut juice") hasCoconutJuice = true;
  });

  if (vegTotal >= 200) {
    vegDiscount = 0.2 * vegTotal;
  }

  if (hasChickenBiryani && hasCoconutJuice) {
    const comboPrice = cart.reduce((total, item) => {
      if (
        item.name.toLowerCase() === "chicken biryani" ||
        item.name.toLowerCase() === "coconut juice"
      ) {
        return total + item.price * item.Quantity;
      }
      return total;
    }, 0);
    comboDiscount = comboPrice - 200;
  }

  let totalDiscount = juiceDiscount + vegDiscount + comboDiscount;
  let discountedTotal = subtotal - totalDiscount;

  // 🔐 Use coupon OR manual discount
  const discountPercentage = appliedCoupon
    ? coupons[appliedCoupon]
    : selectedDiscount;

  const extraDiscount = (discountedTotal * discountPercentage) / 100;
  const finalTotal = discountedTotal - extraDiscount;

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "10px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "15px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={item.imageurl}
            alt={item.name}
            width="100"
            height="80"
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
          <div style={{ flex: "1", marginLeft: "15px" }}>
            <h3 style={{ margin: "0 0 5px" }}>{item.name}</h3>
            <p style={{ margin: "0 0 5px" }}>₹{item.price}</p>
            <p style={{ margin: "0" }}>Quantity: {item.Quantity}</p>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={() => handleIncrement(item.id, item.name)}
              style={{ padding: "5px 10px" }}
            >
              +
            </button>
            <button
              onClick={() =>
                handleDecrement(item.id, item.name, item.Quantity)
              }
              style={{ padding: "5px 10px" }}
            >
              -
            </button>
            <button
              onClick={() => handleRemove(item.id, item.name)}
              style={{
                padding: "5px 10px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* 🧾 Coupon and Discount */}
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon"
          style={{
            padding: "8px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          disabled={appliedCoupon}
        />
        <button
          onClick={handleApplyCoupon}
          style={{
            padding: "8px 12px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
          disabled={appliedCoupon}
        >
          Apply Coupon
        </button>
      </div>

      {/* 🎚️ Discount Dropdown */}
      {!appliedCoupon && (
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <label style={{ marginRight: "10px" }}>Choose Discount:</label>
          <select
            value={selectedDiscount}
            onChange={(e) => setSelectedDiscount(Number(e.target.value))}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value={0}>None</option>
            <option value={10}>10% Off</option>
            <option value={20}>20% Off</option>
            <option value={30}>30% Off</option>
          </select>
        </div>
      )}

      {/* 📧 Email Input */}
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <label style={{ marginRight: "10px" }}>Enter your Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
      </div>

      {/* 💰 Price Summary */}
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        {juiceDiscount > 0 && (
          <p>🥤 Juice Offer: -₹{juiceDiscount.toFixed(2)}</p>
        )}
        {vegDiscount > 0 && (
          <p>🍛 Veg Discount: -₹{vegDiscount.toFixed(2)}</p>
        )}
        {comboDiscount > 0 && (
          <p>🍗 Combo Discount: -₹{comboDiscount.toFixed(2)}</p>
        )}
        {discountPercentage > 0 && (
          <p>
            {appliedCoupon
              ? `💳 Coupon (${appliedCoupon})`
              : `🎚️ Manual Discount (${discountPercentage}%)`}
            : -₹{extraDiscount.toFixed(2)}
          </p>
        )}
        <h3>Total: ₹{finalTotal.toFixed(2)}</h3>
      </div>

      {/* 🛒 Checkout Button */}
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <button
          onClick={handleCheckout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Checkout
        </button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
}

export default Cart;
