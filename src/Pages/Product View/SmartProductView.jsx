import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillStar,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMobile,
} from "react-icons/ai";
import {
  BiCartAdd,
  BiCartDownload,
  BiPulse,
  BiBluetooth,
  BiChip,
} from "react-icons/bi";
import {
  MdPhoneInTalk,
  MdFitnessCenter,
  MdVerified,
} from "react-icons/md";
import {
  FiActivity,
  FiBatteryCharging,
  FiTruck,
  FiShield,
  FiShare2,
} from "react-icons/fi";
import { toast } from "react-toastify";
import "./SmartProductView.css";

const SmartProductView = ({
  product,
  relatedProducts = [],
  addToCartHandler,
  addToWishlistHandler,
  isProductInCart,
  isProductInWishlist,
  cartBtnDisabled,
  wishlistBtnDisabled,
}) => {
  const [activeTab, setActiveTab] = useState("smart-features");
  const [edition, setEdition] = useState("Obsidian Black (Silicone Sport)");

  const mrpPrice = Math.round(product.price * 1.5);
  const discountPercent = Math.round(((mrpPrice - product.price) / mrpPrice) * 100);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${product.brand} Smart Watch`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  return (
    <div className="smart-product-page">
      {/* Top Banner & Breadcrumb */}
      <div className="smart-top-nav">
        <div className="smart-breadcrumb">
          <Link to="/" className="smart-crumb-link">
            Home
          </Link>
          <span className="smart-crumb-sep">/</span>
          <Link to="/products" className="smart-crumb-link">
            Smart Tech
          </Link>
          <span className="smart-crumb-sep">/</span>
          <span className="smart-crumb-category">Wearable OS</span>
          <span className="smart-crumb-sep">/</span>
          <span className="smart-crumb-current">{product.brand}</span>
        </div>
        <div className="smart-top-actions">
          <span className="smart-pulse-tag">
            <span className="live-dot"></span> NEXT-GEN BIOMETRIC HUB
          </span>
          <button className="smart-share-btn" onClick={handleShare} title="Share Smart Watch">
            <FiShare2 />
          </button>
        </div>
      </div>

      {/* Main Two-Column Smart Layout */}
      <div className="smart-main-grid">
        {/* Left Column: Tech Visual Deck */}
        <div className="smart-visual-column">
          <div className="smart-image-stage">
            <div className="smart-ambient-glow"></div>
            <div className="smart-tech-corners">
              <span className="corner tl"></span>
              <span className="corner tr"></span>
              <span className="corner bl"></span>
              <span className="corner br"></span>
            </div>

            <div className="smart-telemetry-badge">
              <FiActivity className="icon-pulse" />
              <span>AMOLED RETINA • ALWAYS-ON</span>
            </div>

            <div className="smart-img-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="smart-primary-img"
              />
            </div>

            <div className="smart-sensor-chips">
              <div className="smart-chip">
                <BiPulse className="chip-icon pulse-red" />
                <span>24/7 SpO2 & Heart</span>
              </div>
              <div className="smart-chip">
                <MdPhoneInTalk className="chip-icon" />
                <span>Bluetooth Call</span>
              </div>
              <div className="smart-chip">
                <FiBatteryCharging className="chip-icon green" />
                <span>10-Day Battery</span>
              </div>
            </div>
          </div>

          {/* Biometrics Matrix Card */}
          <div className="smart-telemetry-card">
            <h4 className="smart-telemetry-heading">BIOMETRIC & HARDWARE SUITE</h4>
            <div className="smart-telemetry-grid">
              <div className="telemetry-item">
                <div className="telemetry-icon-wrap heart">
                  <BiPulse />
                </div>
                <div className="telemetry-info">
                  <span className="telemetry-title">Real-Time Pulse & SpO2</span>
                  <span className="telemetry-sub">Optical PPG Biosensor Array</span>
                </div>
              </div>
              <div className="telemetry-item">
                <div className="telemetry-icon-wrap bluetooth">
                  <BiBluetooth />
                </div>
                <div className="telemetry-info">
                  <span className="telemetry-title">BT 5.3 On-Wrist Voice</span>
                  <span className="telemetry-sub">Dual Mic + Noise Filter</span>
                </div>
              </div>
              <div className="telemetry-item">
                <div className="telemetry-icon-wrap sport">
                  <MdFitnessCenter />
                </div>
                <div className="telemetry-info">
                  <span className="telemetry-title">100+ Sports Modes</span>
                  <span className="telemetry-sub">Auto Workout Detection</span>
                </div>
              </div>
              <div className="telemetry-item">
                <div className="telemetry-icon-wrap chip">
                  <BiChip />
                </div>
                <div className="telemetry-info">
                  <span className="telemetry-title">Ultra-Low Power Chip</span>
                  <span className="telemetry-sub">Next-Gen Dual-Core SoC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Smart Specs & Purchase Flow */}
        <div className="smart-details-column">
          <div className="smart-brand-meta">
            <span className="smart-brand-chip">{product.brand}</span>
            <span className="smart-os-tag">
              <AiOutlineMobile /> COMPATIBLE: iOS & ANDROID
            </span>
          </div>

          <h1 className="smart-product-title">{product.name}</h1>

          {/* Rating Block */}
          <div className="smart-ratings-bar">
            <div className="smart-stars">
              {[...Array(5)].map((_, i) => (
                <AiFillStar
                  key={i}
                  className={
                    i < Math.floor(product.customerReviews?.avgValue || 4)
                      ? "star-cyan"
                      : "star-dim"
                  }
                />
              ))}
            </div>
            <span className="smart-rating-score">
              {product.customerReviews?.avgValue} / 5.0
            </span>
            <span className="smart-rating-count">
              ({product.customerReviews?.count} verified users)
            </span>
          </div>

          {/* Price Block */}
          <div className="smart-pricing-box">
            <div className="smart-price-row">
              <span className="smart-current-price">₹{product.price}</span>
              <span className="smart-mrp-price">₹{mrpPrice}</span>
              <span className="smart-discount-pill">{discountPercent}% TECH SAVINGS</span>
            </div>
            <p className="smart-battery-status">
              ⚡ Magnetic Rapid Charge Included • 100% In 45 Mins • 7-Day Replacement
            </p>
          </div>

          {/* Description */}
          <div className="smart-description-card">
            <p className="smart-description-text">{product.description}</p>
          </div>

          {/* Band / Edition Selection */}
          <div className="smart-edition-selection">
            <label className="smart-option-label">STRAP & CHASSIS FINISH</label>
            <div className="smart-edition-buttons">
              {[
                "Obsidian Black (Silicone Sport)",
                "Space Gray (Breathable Loop)",
                "Cyber Silver (Milanese Magnetic)",
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`edition-btn ${edition === opt ? "selected" : ""}`}
                  onClick={() => setEdition(opt)}
                >
                  <MdVerified className="verified-icon" /> {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="smart-actions-bar">
            <button
              className={`smart-cart-btn ${cartBtnDisabled ? "btn-disabled" : ""}`}
              onClick={() => addToCartHandler(product)}
              disabled={cartBtnDisabled}
            >
              {isProductInCart ? (
                <>
                  <BiCartDownload className="btn-icon" /> VIEW IN SMART CART
                </>
              ) : (
                <>
                  <BiCartAdd className="btn-icon" /> INITIALIZE SETUP • ADD TO CART
                </>
              )}
            </button>

            <button
              className={`smart-wishlist-btn ${
                isProductInWishlist ? "synced" : ""
              } ${wishlistBtnDisabled ? "btn-disabled" : ""}`}
              onClick={() => addToWishlistHandler(product)}
              disabled={wishlistBtnDisabled}
            >
              {isProductInWishlist ? (
                <>
                  <AiFillHeart className="btn-icon purple" /> SYNCED IN WISHLIST
                </>
              ) : (
                <>
                  <AiOutlineHeart className="btn-icon" /> SAVE TO TECH WISHLIST
                </>
              )}
            </button>
          </div>

          {/* Smart Guarantee Badges */}
          <div className="smart-guarantee-grid">
            <div className="smart-guarantee-cell">
              <FiTruck className="s-icon" />
              <div>
                <strong>Express Delivery</strong>
                <span>Air priority courier</span>
              </div>
            </div>
            <div className="smart-guarantee-cell">
              <FiShield className="s-icon" />
              <div>
                <strong>1-Year Tech Shield</strong>
                <span>Official brand replacement</span>
              </div>
            </div>
            <div className="smart-guarantee-cell">
              <FiBatteryCharging className="s-icon" />
              <div>
                <strong>Certified Battery</strong>
                <span>Grade-A lithium cell</span>
              </div>
            </div>
          </div>

          {/* Tech Tabs Section */}
          <div className="smart-tabs-wrapper">
            <div className="smart-tab-headers">
              <button
                className={`tab-btn ${activeTab === "smart-features" ? "active" : ""}`}
                onClick={() => setActiveTab("smart-features")}
              >
                Hardware & Sensors
              </button>
              <button
                className={`tab-btn ${activeTab === "os-companion" ? "active" : ""}`}
                onClick={() => setActiveTab("os-companion")}
              >
                OS & Companion App
              </button>
              <button
                className={`tab-btn ${activeTab === "package" ? "active" : ""}`}
                onClick={() => setActiveTab("package")}
              >
                Unboxing Deck
              </button>
            </div>

            <div className="smart-tab-body">
              {activeTab === "smart-features" && (
                <div className="smart-specs-table">
                  <div className="spec-row">
                    <span className="spec-key">Display</span>
                    <span className="spec-val">Ultra-Vivid HD Always-On Touch Screen</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Biometric Array</span>
                    <span className="spec-val">Heart Rate, SpO2 Blood Oxygen, Sleep Analyzer</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Calling & Audio</span>
                    <span className="spec-val">Bluetooth HD Calling + Built-in Mic & Speaker</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Battery Duration</span>
                    <span className="spec-val">Up to 7-10 Days (Normal), 20 Days (Standby)</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Water Ingress Rating</span>
                    <span className="spec-val">IP68 Sweat, Rain & Dust Resistant</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Finish Selected</span>
                    <span className="spec-val">{edition}</span>
                  </div>
                </div>
              )}

              {activeTab === "os-companion" && (
                <div className="os-content">
                  <p>
                    <strong>Seamless Smartphone Synchronization:</strong> Connects instantly with
                    both Apple iOS (v14+) and Google Android (v9.0+). Receive calls, WhatsApp alerts,
                    calendar reminders, and control music without taking out your phone.
                  </p>
                  <p>
                    <strong>100+ Cloud Watch Faces:</strong> Customize your dial instantly through the
                    companion mobile application or set your personal gallery wallpaper.
                  </p>
                </div>
              )}

              {activeTab === "package" && (
                <ul className="smart-package-list">
                  <li>⚡ 1x {product.name}</li>
                  <li>⚡ Magnetic USB-C Fast Wireless Charging Dock</li>
                  <li>⚡ Hypoallergenic Quick-Release Silicone Sport Strap</li>
                  <li>⚡ Quick Setup & Mobile App Pairing QR Manual</li>
                  <li>⚡ 12-Month Official Warranty Card</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Smart Watches Section */}
      {relatedProducts.length > 0 && (
        <div className="smart-related-section">
          <div className="smart-related-header">
            <div>
              <span className="sub-title">NEXT-GEN ECOSYSTEM</span>
              <h3 className="smart-related-title">EXPLORE MORE SMART WEARABLES</h3>
            </div>
            <Link to="/products" className="smart-view-all">
              All Smart Watches →
            </Link>
          </div>

          <div className="smart-related-grid">
            {relatedProducts.slice(0, 4).map((item) => (
              <Link
                key={item._id}
                to={`/products/${item._id}`}
                className="smart-related-card"
              >
                <div className="smart-card-img-wrap">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="smart-card-info">
                  <span className="card-brand">{item.brand}</span>
                  <h4 className="card-name">{item.name}</h4>
                  <div className="card-bottom">
                    <span className="card-price">₹{item.price}</span>
                    <span className="card-rating">
                      <AiFillStar /> {item.customerReviews?.avgValue}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { SmartProductView };
