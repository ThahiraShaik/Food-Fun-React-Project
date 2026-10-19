import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./Store.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Veg.css";  // import the CSS file below

const styles = {
  button: {
    padding: "5px 10px",
    marginTop: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    background: "#28a745",
    color: "white",
    transition: "transform 0.2s ease",
  },
  buttonClicked: {
    transform: "scale(1.1)",
  },
};

function Veg() {
  const vegItems = useSelector((state) => state.products.Veg);
  const dispatch = useDispatch();
  const [clickedId, setClickedId] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    pauseOnHover: true,
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      className: "custom-toast-success",
    });

    setClickedId(item.id);
    setTimeout(() => setClickedId(null), 200);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🥬 Eat veg for healthy life.
      </h1>

      <Slider {...settings} style={{ marginBottom: "30px" }}>
        {vegItems.map((item) => (
          <div key={item.id} style={{ textAlign: "center" }}>
            <img
              src={item.imageurl}
              alt={item.name}
              style={{
                width: "auto",
                maxWidth: "80%",
                height: "300px",
                objectFit: "contain",
                margin: "0 auto",
                borderRadius: "20px",
              }}
            />
          </div>
        ))}
      </Slider>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {vegItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={item.imageurl}
              alt={item.name}
              style={{
                width: "200px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button
              onClick={() => handleAddToCart(item)}
              style={{
                ...styles.button,
                ...(clickedId === item.id ? styles.buttonClicked : {}),
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
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

export default Veg;
