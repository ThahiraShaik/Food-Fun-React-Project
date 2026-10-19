import React from "react";
import "./Aboutus.css";

const products = [
  {
    title: "Tiffins",
    description:
      "Our signature tiffins bring you a delightful variety of quick, wholesome meals perfect for lunch or dinner. From traditional recipes to modern twists, every tiffin is packed with fresh ingredients and cooked to perfection.",
    img: "/imgs/pesarattu.jpg",
  },
  {
    title: "Vegetarian Delights",
    description:
      "Savor the goodness of our vegetarian menu featuring vibrant, nutrient-rich dishes crafted with seasonal vegetables, legumes, and aromatic spices. Whether it’s creamy paneer, hearty dals, or crisp salads, our veg offerings cater to every palate.",
    img: "/imgs/brinjalcurry.jpg",
  },
  {
    title: "Non-Vegetarian Specials",
    description:
      "For meat lovers, our non-vegetarian selection includes tender chicken, flavorful fish, and succulent mutton recipes, all prepared with hygienic care and bold spices to deliver rich taste and satisfaction.",
    img: "/imgs/hybi.jpg",
  },
  {
    title: "Fresh Juices",
    description:
      "Quench your thirst and boost your energy with our freshly squeezed juices made from farm-fresh fruits and natural ingredients. Tangy citrus blends to sweet tropical flavors await you.",
    img: "imgs/apple.jpg",
  },
];

const teamMembers = [
  {
    name: "Anita Sharma",
    role: "Founder & CEO",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Raj Patel",
    role: "Head Chef",
    img: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Sneha Verma",
    role: "Marketing Lead",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Amit Singh",
    role: "Delivery Manager",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

function Aboutus() {
  return (
    <div className="about-container">
      {/* Main Heading */}
      <h1 className="about-title">About Food Fun</h1>

      {/* Intro Section */}
      <section className="intro-section">
        <p>
          Welcome to <strong>Food Fun</strong> — your trusted partner for
          delicious, nutritious meals delivered fresh every day. We combine
          quality ingredients, hygiene, and love in every bite to make your
          meal times joyful.
        </p>
      </section>

      {/* Products */}
      {products.map((product, idx) => (
        <section
          key={idx}
          className={`about-section ${idx % 2 !== 0 ? "reverse" : ""}`}
        >
          <div className="image-block">
            <img src={product.img} alt={product.title} />
          </div>
          <div className="text-block">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </div>
        </section>
      ))}

      {/* Team */}
      <h2 className="section-title centered underline">Meet Our Team</h2>
      <div className="team-container">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="team-card">
            <img src={member.img} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <h2 className="section-title centered underline">Contact Us</h2>
      <div className="contact-container">
        <p>
          Email:{" "}
          <a href="mailto:contact@foodfun.com" className="contact-link">
            contact@foodfun.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+1234567890" className="contact-link">
            +1 (234) 567-890
          </a>
        </p>
        <div className="social-links">
          <a
            href="https://facebook.com/foodfun"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/24/733/733547.png"
              alt="Facebook"
            />
          </a>
          <a
            href="https://twitter.com/foodfun"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/24/733/733579.png"
              alt="Twitter"
            />
          </a>
          <a
            href="https://instagram.com/foodfun"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/24/733/733558.png"
              alt="Instagram"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
