import { useContext, useEffect, useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BsArrowRight,
  BsShieldCheck,
  BsTruck,
  BsAward,
  BsHeadset,
  BsCheckCircleFill,
  BsGithub,
  BsTwitter,
  BsLinkedin,
  BsInstagram,
} from "react-icons/bs";
import heroWatch from "../../Assets/hero_watch_campaign.jpg";
import campaignLuxury from "../../Assets/campaign_luxury.jpg";
import campaignSports from "../../Assets/campaign_sports.jpg";
import campaignSmart from "../../Assets/campaign_smart.jpg";
import brandCraftsmanship from "../../Assets/brand_craftsmanship.jpg";
import minuteLogo from "../../Assets/minuteLogoDarkMode.png";
import { ProductContext } from "../../Contexts/ProductContext";
import { ProductCard } from "../../Component/ProductCard/ProductCard";
import "./HomeStyle.css";

const Home = () => {
  const { productState, filtersDispatch } = useContext(ProductContext);
  const navigate = useNavigate();

  const [activeCategoryTab, setActiveCategoryTab] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter products for the trending showcase
  const filteredTrendingProducts = useMemo(() => {
    if (!productState?.products?.length) return [];
    if (activeCategoryTab === "All") {
      return productState.products.slice(0, 8);
    }
    return productState.products
      .filter((p) => p.categoryName === activeCategoryTab)
      .slice(0, 8);
  }, [productState?.products, activeCategoryTab]);

  // Best sellers
  const bestSellers = useMemo(() => {
    if (!productState?.products?.length) return [];
    const sellers = productState.products.filter((p) => p.isBestSeller);
    return sellers.length > 0
      ? sellers.slice(0, 4)
      : productState.products.slice(0, 4);
  }, [productState?.products]);

  const handleCategoryClick = (categoryName) => {
    filtersDispatch({ type: "setClear", payload: "" });
    if (categoryName) {
      filtersDispatch({
        type: "setCategoryFilter",
        payload: categoryName,
      });
    }
    navigate("/products");
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setNewsletterSubscribed(true);
    toast.success("Welcome to the Collectors Circle! Your ₹500 credit is ready.");
  };

  return (
    <div className="home-page-container">
      {/* =====================================================
          1. HERO CAMPAIGN SECTION
          ===================================================== */}
      <section className="hero-campaign-section">
        <div className="hero-media-wrapper">
          <img
            src={heroWatch}
            alt="Minute Haute Horlogerie Luxury Timepiece"
            className="hero-media-image"
          />
          <div className="hero-gradient-overlay" />
        </div>

        <div className="hero-content-container">
          <div className="hero-tag-pill">2026 HOROLOGY REPERTOIRE</div>
          <h1 className="hero-headline">Time, Defined by You.</h1>
          <p className="hero-subheadline">
            Discover distinctive mechanical complications, tactical
            chronographs, and connected precision wear. Engineered for those
            who master every second.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn-primary-luxury"
              onClick={() => handleCategoryClick()}
            >
              Explore Collection <BsArrowRight className="btn-icon" />
            </button>
            <a href="#best-sellers" className="btn-secondary-luxury">
              Discover Best Sellers
            </a>
          </div>

          <div className="hero-metrics-strip">
            <div className="hero-metric-item">
              <span className="metric-number">100%</span>
              <span className="metric-label">Certified Authentic</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <span className="metric-number">2-Year</span>
              <span className="metric-label">Movement Warranty</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <span className="metric-number">5,000+</span>
              <span className="metric-label">Verified Collectors</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. FEATURED CAMPAIGNS (Watches.com Signature Style)
          ===================================================== */}
      <section className="campaign-spotlight-section">
        <div className="section-header">
          <span className="section-eyebrow">EDITORIAL SPOTLIGHT</span>
          <h2 className="section-title">Signature Horology Campaigns</h2>
          <p className="section-subtitle">
            Curated collections inspired by horological heritage, tactical
            resilience, and modern technological advancement.
          </p>
        </div>

        <div className="campaign-grid">
          {/* Campaign 1: Luxury */}
          <div
            className="campaign-card"
            onClick={() => handleCategoryClick("Luxury Watch")}
          >
            <div className="campaign-card-media">
              <img
                src={campaignLuxury}
                alt="Luxury Swiss Tourbillon & Gold Watch"
                loading="lazy"
              />
              <div className="campaign-media-overlay" />
            </div>
            <div className="campaign-card-content">
              <span className="campaign-pill">HAUTE HORLOGERIE</span>
              <h3 className="campaign-card-title">
                Perpetual Motion & Gold Complications
              </h3>
              <p className="campaign-card-desc">
                Hand-finished exposed balances, sapphire casebacks, and rose
                gold detailing crafted for life's landmark occasions.
              </p>
              <button className="campaign-card-btn">
                Discover Luxury <BsArrowRight />
              </button>
            </div>
          </div>

          {/* Campaign 2: Sports */}
          <div
            className="campaign-card"
            onClick={() => handleCategoryClick("Sports Watch")}
          >
            <div className="campaign-card-media">
              <img
                src={campaignSports}
                alt="Titanium Diver Sports Chronograph"
                loading="lazy"
              />
              <div className="campaign-media-overlay" />
            </div>
            <div className="campaign-card-content">
              <span className="campaign-pill">TACTICAL PERFORMANCE</span>
              <h3 className="campaign-card-title">
                Engineered for Extreme Depths
              </h3>
              <p className="campaign-card-desc">
                Titanium-reinforced chronographs with 50M+ water resistance and
                high-contrast luminescent dials for tactical endurance.
              </p>
              <button className="campaign-card-btn">
                Explore Sports <BsArrowRight />
              </button>
            </div>
          </div>

          {/* Campaign 3: Smart */}
          <div
            className="campaign-card"
            onClick={() => handleCategoryClick("Smart Watch")}
          >
            <div className="campaign-card-media">
              <img
                src={campaignSmart}
                alt="High-Tech Curved OLED Smartwatch"
                loading="lazy"
              />
              <div className="campaign-media-overlay" />
            </div>
            <div className="campaign-card-content">
              <span className="campaign-pill">DIGITAL HORIZON</span>
              <h3 className="campaign-card-title">
                Connected Precision on the Wrist
              </h3>
              <p className="campaign-card-desc">
                Curved OLED sapphire crystals, real-time biometrics, and
                aerospace-grade finishes merging tech with fine craftsmanship.
              </p>
              <button className="campaign-card-btn">
                Explore Smartwatches <BsArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          3. SHOP BY COLLECTION / CATEGORY
          ===================================================== */}
      <section className="collections-section">
        <div className="section-header">
          <span className="section-eyebrow">CURATED PORTFOLIO</span>
          <h2 className="section-title">Shop by Distinctive Category</h2>
          <p className="section-subtitle">
            Navigate through carefully cataloged horological disciplines.
          </p>
        </div>

        <div className="collections-container">
          {productState.categories.map(
            ({ _id, image, categoryName, description }) => {
              const count = productState.products.filter(
                (p) => p.categoryName === categoryName
              ).length;

              return (
                <div
                  key={_id}
                  className="collection-pill-card"
                  onClick={() => handleCategoryClick(categoryName)}
                >
                  <div className="collection-img-box">
                    <img src={image} alt={categoryName} loading="lazy" />
                  </div>
                  <div className="collection-info">
                    <div className="collection-title-row">
                      <h3 className="collection-name">{categoryName}</h3>
                      <span className="collection-badge">{count} Pieces</span>
                    </div>
                    <p className="collection-desc">{description}</p>
                    <span className="collection-link-text">
                      Browse Category <BsArrowRight />
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* =====================================================
          4. TRENDING TIMEPIECES & NEW ARRIVALS
          ===================================================== */}
      <section className="trending-showcase-section">
        <div className="section-header">
          <span className="section-eyebrow">CATALOG SPOTLIGHT</span>
          <h2 className="section-title">Trending Timepieces & New Arrivals</h2>
          <p className="section-subtitle">
            Explore authentic watches actively favored by collectors and enthusiasts worldwide.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="product-filter-tabs">
            {["All", "Luxury Watch", "Sports Watch", "Smart Watch"].map((tab) => (
              <button
                key={tab}
                className={`filter-tab-btn ${
                  activeCategoryTab === tab ? "active" : ""
                }`}
                onClick={() => setActiveCategoryTab(tab)}
              >
                {tab === "All"
                  ? "All Timepieces"
                  : tab.replace(" Watch", "")}
              </button>
            ))}
          </div>
        </div>

        <div className="trending-products-grid">
          {filteredTrendingProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="catalog-cta-wrap">
          <button
            className="btn-outline-luxury"
            onClick={() => handleCategoryClick()}
          >
            View Complete Collection ({productState?.products?.length || 0} Models)
            <BsArrowRight />
          </button>
        </div>
      </section>

      {/* =====================================================
          5. BEST SELLERS SPOTLIGHT
          ===================================================== */}
      <section id="best-sellers" className="bestsellers-spotlight-section">
        <div className="bestsellers-inner">
          <div className="bestsellers-header">
            <div>
              <span className="section-eyebrow gold">CURATED RARITIES</span>
              <h2 className="section-title white">The Collector's Best Sellers</h2>
              <p className="section-subtitle light">
                Our most celebrated and verified customer favorites, rated for
                flawless timekeeping and build quality.
              </p>
            </div>
            <button
              className="btn-gold-luxury"
              onClick={() => handleCategoryClick()}
            >
              Browse All Best Sellers <BsArrowRight />
            </button>
          </div>

          <div className="bestsellers-grid">
            {bestSellers.map((product) => (
              <div key={product._id} className="bestseller-card-wrapper">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          6. BRAND STORY & ATELIER CRAFTSMANSHIP
          ===================================================== */}
      <section className="brand-story-section">
        <div className="brand-story-grid">
          <div className="brand-story-media">
            <img
              src={brandCraftsmanship}
              alt="Master Watchmaker in Horology Atelier"
              className="brand-story-image"
              loading="lazy"
            />
            <div className="brand-story-badge">
              <span className="badge-title">GENEVA STANDARDS</span>
              <span className="badge-sub">14-Point Inspection Protocol</span>
            </div>
          </div>

          <div className="brand-story-content">
            <span className="section-eyebrow">OUR HOROLOGICAL PHILOSOPHY</span>
            <h2 className="brand-story-title">
              The Pursuit of Uncompromising Precision
            </h2>
            <p className="brand-story-lead">
              At Minute, we view a watch not merely as an instrument of measurement,
              but as an intimate expression of character, devotion, and mechanical art.
            </p>
            <p className="brand-story-body">
              Every timepiece in our curated repertoire undergoes comprehensive
              scrutiny before reaching your collection. From balance-wheel beat rate
              frequency and escapement tolerances to scratch-tested sapphire crystals
              and pressure-chamber dive depths, our rigorous standards protect your
              investment.
            </p>

            <div className="brand-pillars-list">
              <div className="pillar-item">
                <BsCheckCircleFill className="pillar-icon" />
                <div>
                  <strong>Micro-Tolerance Verification</strong>
                  <p>Movement timing calibrated within strict daily variances.</p>
                </div>
              </div>
              <div className="pillar-item">
                <BsCheckCircleFill className="pillar-icon" />
                <div>
                  <strong>Certified Provenance</strong>
                  <p>100% genuine origin directly from certified watchmakers and brands.</p>
                </div>
              </div>
              <div className="pillar-item">
                <BsCheckCircleFill className="pillar-icon" />
                <div>
                  <strong>Dedicated Horologist Concierge</strong>
                  <p>Expert guidance on wrist sizing, maintenance, and collector advice.</p>
                </div>
              </div>
            </div>

            <div className="brand-story-action">
              <button
                className="btn-primary-luxury"
                onClick={() => handleCategoryClick()}
              >
                Explore Curated Timepieces <BsArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          7. TRUST & CUSTOMER CONFIDENCE PILLARS
          ===================================================== */}
      <section className="trust-pillars-section">
        <div className="trust-pillars-grid">
          <div className="trust-pillar-card">
            <div className="trust-icon-box">
              <BsShieldCheck />
            </div>
            <h4 className="trust-title">100% Authenticity Guarantee</h4>
            <p className="trust-desc">
              Every timepiece is thoroughly verified by our horology team. Genuine
              manufacturer serials and documentation included.
            </p>
          </div>

          <div className="trust-pillar-card">
            <div className="trust-icon-box">
              <BsTruck />
            </div>
            <h4 className="trust-title">Express Insured Transit</h4>
            <p className="trust-desc">
              Complimentary signature-required delivery on orders over ₹2,000 in
              shockproof, tamper-evident protective casing.
            </p>
          </div>

          <div className="trust-pillar-card">
            <div className="trust-icon-box">
              <BsAward />
            </div>
            <h4 className="trust-title">2-Year Movement Warranty</h4>
            <p className="trust-desc">
              Comprehensive mechanical protection against defects. We stand
              behind the precision of every watch we curate.
            </p>
          </div>

          <div className="trust-pillar-card">
            <div className="trust-icon-box">
              <BsHeadset />
            </div>
            <h4 className="trust-title">Horology Concierge</h4>
            <p className="trust-desc">
              Our specialists are on standby for styling recommendations, wrist
              sizing assistance, and post-purchase care.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          8. NEWSLETTER / COLLECTORS CIRCLE
          ===================================================== */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <span className="section-eyebrow gold">THE COLLECTORS CIRCLE</span>
          <h2 className="newsletter-title">Join The Minute Collector Community</h2>
          <p className="newsletter-subtitle">
            Subscribe to receive private drops, independent watchmaker releases,
            and enjoy <span className="highlight-credit">₹500 off</span> your
            inaugural timepiece.
          </p>

          {newsletterSubscribed ? (
            <div className="newsletter-success">
              <BsCheckCircleFill className="success-icon" />
              <span>Thank you! Your ₹500 welcome voucher code <strong>MINUTE500</strong> is activated.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit-btn">
                Claim Invitation <BsArrowRight />
              </button>
            </form>
          )}

          <p className="newsletter-disclaimer">
            We respect your inbox. You may unsubscribe with a single click at any time.
          </p>
        </div>
      </section>

      {/* =====================================================
          9. COMPREHENSIVE LUXURY E-COMMERCE FOOTER
          ===================================================== */}
      <footer className="luxury-footer">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <img src={minuteLogo} alt="Minute Horology" className="footer-logo-img" />
              <span className="footer-logo-text">MINUTE</span>
            </div>
            <p className="footer-bio">
              Independent horology curator providing precision mechanical
              timepieces, luxury Swiss chronographs, and next-generation smart
              wearables to collectors worldwide.
            </p>
            <div className="footer-creator-credit">
              <span>✦ Engineered & Built by <strong>Razin</strong></span>
            </div>
            <div className="footer-social-links">
              <a
                href="https://github.com/vishalsinghrawat29/minute"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <BsGithub />
              </a>
              <a
                href="https://twitter.com/vsrawat2906"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <BsTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/vishalsinghrawat/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <BsLinkedin />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <BsInstagram />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="footer-col">
            <h4 className="footer-col-title">Collections</h4>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => handleCategoryClick("Luxury Watch")}>
                  Haute Horlogerie & Luxury
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Sports Watch")}>
                  Tactical & Sports Divers
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Smart Watch")}>
                  Smart Connected Watches
                </button>
              </li>
              <li>
                <NavLink to="/products">New Arrivals</NavLink>
              </li>
              <li>
                <a href="#best-sellers">The Best Sellers</a>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="footer-col">
            <h4 className="footer-col-title">Client Care</h4>
            <ul className="footer-links-list">
              <li>
                <NavLink to="/cart">Shopping Bag & Checkout</NavLink>
              </li>
              <li>
                <NavLink to="/wishlist">Collector Wishlist</NavLink>
              </li>
              <li>
                <NavLink to="/userDetails">My Account & Orders</NavLink>
              </li>
              <li>
                <NavLink to="/products">Watch Sizing & Strap Guide</NavLink>
              </li>
              <li>
                <NavLink to="/products">Movement Servicing</NavLink>
              </li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div className="footer-col">
            <h4 className="footer-col-title">Authenticity & Legal</h4>
            <ul className="footer-links-list">
              <li>
                <span>100% Authenticity Guarantee</span>
              </li>
              <li>
                <span>Insured Global Shipping Policy</span>
              </li>
              <li>
                <span>30-Day Hassle-Free Returns</span>
              </li>
              <li>
                <span>2-Year Comprehensive Warranty</span>
              </li>
              <li>
                <span>Privacy Policy & Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &#169; {new Date().getFullYear()} Minute Horology. Built by Razin. All Rights Reserved.
          </p>
          <div className="footer-trust-chips">
            <span className="chip">SECURE 256-BIT SSL ENCRYPTION</span>
            <span className="chip">•</span>
            <span className="chip">CERTIFIED HOROLOGICAL VAULT</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { Home };
