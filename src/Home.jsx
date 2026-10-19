import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css"; // 👈 import the css

function Home() {
  const [search, setSearch] = useState("");
  const products = useSelector((state) => state.products);

  // Flatten all items from Tiffins, Veg, NonVeg, Juice
  const allItems = [
    ...products.Tiffins,
    ...products.Veg,
    ...products.NonVeg,
    ...products.Juice,
  ];

  // Filter by search term
  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* 🌟 Banner Section */}
      <div className="banner">
        <h1>
          Welcome to <span className="highlight">Food Fun 🍜</span>
        </h1>
        <p>
          Delicious Tiffins, Veg, Non-Veg, and Juices delivered to your table!
        </p>

        {/* 🔄 Sliding Round Images */}
        <div className="slider">
          <div className="slide-track">
            <div className="slide"><img src="/imgs/idli.jpg" alt="Idli" /></div>
            <div className="slide"><img src="/imgs/dosa.jpg" alt="Dosa" /></div>
            <div className="slide"><img src="/imgs/chickbi.jpg" alt="Chicken Biryani" /></div>
            <div className="slide"><img src="/imgs/paneertikka.jpg" alt="Paneer Tikka" /></div>
            <div className="slide"><img src="/imgs/manju.jpg" alt="Mango Juice" /></div>
            <div className="slide"><img src="/imgs/fishfry.jpg" alt="Fish Fry" /></div>
            <div className="slide"><img src="/imgs/straw.jpg" alt="Strawberry Juice" /></div>
            {/* Repeat for infinite loop effect */}
            <div className="slide"><img src="/imgs/idli.jpg" alt="Idli" /></div>
            <div className="slide"><img src="/imgs/dosa.jpg" alt="Dosa" /></div>
            <div className="slide"><img src="/imgs/chickbi.jpg" alt="Chicken Biryani" /></div>
          </div>
        </div>
      </div>

      {/* 🔍 Search Bar */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="🔍 Search your favorite food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px 20px",
            width: "60%",
            borderRadius: "30px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* 📌 Show search results if searching */}
      {search && (
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Search Results
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
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
                      width: "100%",
                      height: "150px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <h3>{item.name}</h3>
                  <p className="price">₹{item.price}</p>
                </div>
              ))
            ) : (
              <p style={{ gridColumn: "span 4", textAlign: "center" }}>
                No items found.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 📂 Categories Section */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Explore Categories
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "50px",
        }}
      >
        {/* Category cards (Tiffins, Veg, Non-Veg, Juices) */}
        <Link to="/tiffins" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="category-card">
            <img src="/imgs/idli.jpg" alt="Tiffins" />
            <h3>Tiffins</h3>
          </div>
        </Link>

        <Link to="/veg" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="category-card">
            <img src="/imgs/paneertikka.jpg" alt="Veg" />
            <h3>Veg Dishes</h3>
          </div>
        </Link>

        <Link to="/nonveg" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="category-card">
            <img src="/imgs/chickbi.jpg" alt="Non-Veg" />
            <h3>Non-Veg Specials</h3>
          </div>
        </Link>

        <Link to="/juice" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="category-card">
            <img src="/imgs/manju.jpg" alt="Juices" />
            <h3>Fresh Juices</h3>
          </div>
        </Link>
      </div>

      {/* 🎉 Offers Section */}
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Special Offers 🎉</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        <div className="offer-card" style={{ background: "#35d044ff" }}>
          <h3>🥤 Buy 1 Get 1 Free Juices</h3>
          <p>On Mango & Strawberry Juices this weekend!</p>
        </div>

        <div className="offer-card" style={{ background: "#5ba983ff" }}>
          <h3>🍛 Flat 20% Off</h3>
          <p>On all Veg Dishes above ₹200</p>
        </div>

        <div className="offer-card" style={{ background: "#964983ff" }}>
          <h3>🍗 Non-Veg Combo</h3>
          <p>Chicken Biryani + Coconut Juice ₹200</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
