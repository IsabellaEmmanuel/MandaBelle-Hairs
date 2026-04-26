import { useEffect, useMemo, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'

const whatsappUrl = 'https://wa.me/2349035723731'
const logo = new URL('../assets/MB Logo.png', import.meta.url).href
const silkBaseImage = new URL('../assets/Pictures/human hair straight-HD frontal.jpeg', import.meta.url).href
const gluelessBobImage = new URL('../assets/Pictures/bone-straight short bob.jpeg', import.meta.url).href
const honeyBlondeImage = new URL('../assets/Pictures/brown bounce-tip hair.jpeg', import.meta.url).href
const deepWaveImage = new URL('../assets/Pictures/burgundy-straight lace frontal.jpeg', import.meta.url).href
const pixieImage = new URL('../assets/Pictures/unique pixie-curls human hair.jpeg', import.meta.url).href
const midnightStraightImage = new URL('../assets/Pictures/yaki-straight.jpeg', import.meta.url).href
const teamSarahImage = new URL('../assets/Pictures/black-brown body bounce.jpeg', import.meta.url).href
const teamMichaelImage = new URL('../assets/Pictures/black-brown loose bounce human hair.jpeg', import.meta.url).href
const teamAminaImage = new URL('../assets/Pictures/burmese-deep human hair.jpeg', import.meta.url).href
const aboutPosterImage = new URL('../assets/Pictures/pure human hair straight.jpeg', import.meta.url).href
const gallerySecondImage = new URL('../assets/Pictures/jerry-curl human hair.jpeg', import.meta.url).href
const galleryThirdImage = new URL('../assets/Pictures/bone-straight lace frontal.jpeg', import.meta.url).href
const galleryFourthImage = new URL('../assets/Pictures/natural pixie-curls lace frontal.jpeg', import.meta.url).href
const featureVideo = new URL('../assets/Videos/body-wave human hair.mp4', import.meta.url).href
const aboutVideo = new URL('../assets/Videos/afro hair.mp4', import.meta.url).href
const bestsellerVideo = new URL('../assets/Videos/natural burmese-curl hair.mp4', import.meta.url).href
const galleryVideoOne = new URL('../assets/Videos/360 lace straight frontal.mp4', import.meta.url).href
const galleryVideoTwo = new URL('../assets/Videos/bounce-tip lace frontal.mp4', import.meta.url).href
const galleryVideoThree = new URL('../assets/Videos/burgundy deep-wave.mp4', import.meta.url).href
const galleryVideoFour = new URL('../assets/Videos/coloured bone-straight.mp4', import.meta.url).href
const galleryVideoFive = new URL('../assets/Videos/coloured bold-spring curl hair.mp4', import.meta.url).href
const galleryVideoSix = new URL('../assets/Videos/yaki-straight lace frontal.mp4', import.meta.url).href
const editorPictureModules = import.meta.glob('../assets/Pictures/*.{jpeg,jpg,png,webp}', {
  eager: true,
  import: 'default',
})
const editorVideoModules = import.meta.glob('../assets/Videos/*.{mp4,webm,mov}', {
  eager: true,
  import: 'default',
})

const featuredProducts = [
  {
    category: 'Luxury Collection',
    name: 'human hair straight-HD frontal',
    detail: '100% human hair with a pre-plucked hairline and soft, salon-finished movement.',
    price: '₦215k - ₦655k',
    length: '14 inches - 32 inches',
    tone: 'tone-amber',
    image: silkBaseImage,
  },
  {
    category: 'Essential Series',
    name: 'bone-straight short bob',
    detail: 'A sleek, ready-to-wear bob designed for polished everyday styling with minimal fuss.',
    price: '₦275k - ₦1.2m',
    length: '10 inches - 32 inches',
    tone: 'tone-blush',
    image: gluelessBobImage,
  },
  {
    category: 'Color Edition',
    name: 'brown bounce-tip hair',
    detail: 'Bright, voluminous curls with a lightweight feel and full glam impact.',
    price: '₦345k - ₦780k',
    length: '14 inches - 32 inches',
    tone: 'tone-cream',
    image: honeyBlondeImage,
  },
  {
    category: 'Luxury Collection',
    name: 'burgundy-straight lace frontal',
    detail: '22-inch length with a 13x4 frontal for versatile parting and statement texture.',
    price: '₦215k - ₦655k',
    length: '14 inches - 32 inches',
    tone: 'tone-espresso',
    image: deepWaveImage,
  },
  {
    category: 'Short & Sassy',
    name: 'unique pixie-curls human hair',
    detail: 'Low-maintenance, high-style texture with a tailored finish straight out of the box.',
    price: '₦375k - ₦860k',
    length: '14 inches - 32 inches',
    tone: 'tone-copper',
    image: pixieImage,
  },
  {
    category: 'Essential Series',
    name: 'yaki-straight',
    detail: 'Silky straight strands with a smooth finish for a sharp, confident look.',
    price: '₦225k - ₦665k',
    length: '14 inches - 32 inches',
    tone: 'tone-noir',
    image: midnightStraightImage,
  },
]

const supportHighlights = [
  {
    title: 'Trusted Online Store',
    detail: 'What you order is what you get, with reliable service from checkout to delivery.',
  },
  {
    title: 'Free Delivery in Nigeria',
    detail: 'All orders within Nigeria are delivered at no extra shipping cost.',
  },
  {
    title: 'Worldwide Shipping',
    detail: 'Clients outside Nigeria can order with courier pricing agreed per destination.',
  },
  {
    title: '7-Day Local Delivery',
    detail: 'Local Nigerian orders arrive within 7 business days after payment.',
  },
]

const aboutSlideshowImages = [
  { image: teamSarahImage, alt: 'Luxury wig styling showcase' },
  { image: silkBaseImage, alt: 'Silk base wig preview' },
  { image: deepWaveImage, alt: 'Curly wig texture showcase' },
  { image: gluelessBobImage, alt: 'Glueless wig close-up' },
  { image: teamAminaImage, alt: 'Customer experience showcase' },
  { image: honeyBlondeImage, alt: 'Honey blonde wig preview' },
]

const productOptions = {
  capSizes: ['Small (21.5")', 'Medium (22.5")', 'Large (23.5")'],
  laceColors: ['Natural Black', 'Chocolate Brown', 'Honey Blonde'],
}

const productPerks = ['Express Shipping', 'Secure Payments', '24/7 Support']
const productGallery = [silkBaseImage, gallerySecondImage, galleryThirdImage, galleryFourthImage]
const editorMediaLibrary = [
  ...Object.entries(editorPictureModules).map(([path, src]) => ({ path, src, type: 'image' })),
  ...Object.entries(editorVideoModules).map(([path, src]) => ({ path, src, type: 'video' })),
]
  .sort((left, right) => left.path.localeCompare(right.path))
  .map((item) => {
    const filename = item.path.split('/').pop() ?? item.path
    const stem = filename.replace(/\.[^/.]+$/, '')
    const key = stem
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    return {
      ...item,
      filename,
      stem,
      key,
    }
  })

const galleryCollections = [
  {
    slug: 'bone-straight-wigs',
    title: 'Yaki Straight',
    detail: 'Ultra-sleek lengths with mirror shine and a clean luxury finish.',
    poster: midnightStraightImage,
  },
  {
    slug: 'curly-wigs',
    title: 'Burgundy Straight Lace Frontal',
    detail: 'Defined curls, rich volume, and statement texture for standout looks.',
    poster: deepWaveImage,
  },
  {
    slug: 'glueless-wigs',
    title: 'Bone-Straight Short Bob',
    detail: 'Easy-to-wear units designed for comfort, convenience, and secure styling.',
    poster: gluelessBobImage,
  },
  {
    slug: 'lace-front-wigs',
    title: 'Human Hair Straight-HD Frontal',
    detail: 'Natural-looking hairlines and versatile parting with a salon-grade finish.',
    poster: silkBaseImage,
  },
  {
    slug: 'bob-wigs',
    title: 'Unique Pixie-Curls Human Hair',
    detail: 'Chic, low-maintenance cuts for polished everyday beauty.',
    poster: pixieImage,
  },
]

const galleryVideos = [
  {
    title: '360 Lace Straight Frontal',
    detail: 'A smooth, camera-ready finish with natural movement and a polished center part.',
    video: galleryVideoOne,
    poster: midnightStraightImage,
    href: '/bone-straight-wigs',
  },
  {
    title: 'Bounce-Tip Lace Frontal',
    detail: 'Defined body waves with bounce, shine, and an easy premium drape.',
    video: galleryVideoTwo,
    poster: silkBaseImage,
    href: '/lace-front-wigs',
  },
  {
    title: 'Burgundy Deep-Wave',
    detail: 'An up-close look at lace finishing, density, and salon-level styling details.',
    video: galleryVideoThree,
    poster: deepWaveImage,
    href: '/lace-front-wigs',
  },
  {
    title: 'Coloured Bone-Straight',
    detail: 'A short, wearable cut designed for effortless styling and confident daily wear.',
    video: galleryVideoFour,
    poster: gluelessBobImage,
    href: '/bob-wigs',
  },
  {
    title: 'Coloured Bold-Spring Curl Hair',
    detail: 'Full texture, rich volume, and beautiful definition for standout moments.',
    video: galleryVideoFive,
    poster: honeyBlondeImage,
    href: '/curly-wigs',
  },
  {
    title: 'Yaki-Straight Lace Frontal',
    detail: 'A quick browse through premium units available for fast ordering on WhatsApp.',
    video: galleryVideoSix,
    poster: galleryFourthImage,
    href: '/glueless-wigs',
  },
]

const collectionPages = {
  'bone-straight-wigs': {
    eyebrow: 'Silk Finish',
    title: 'Bone Straight Wigs',
    description:
      'Our bone straight collection is for clients who want sleek density, reflective shine, and a polished finish that looks expensive from every angle.',
    video: galleryVideoOne,
    poster: midnightStraightImage,
    gallery: [midnightStraightImage, silkBaseImage, gallerySecondImage],
    highlights: ['Pin-straight finish', 'Natural shine', 'Heat-styling friendly', 'Soft luxury density'],
    products: [featuredProducts[5], featuredProducts[0], featuredProducts[3], featuredProducts[1]],
  },
  'curly-wigs': {
    eyebrow: 'Volume & Texture',
    title: 'Curly Wigs',
    description:
      'From soft glam curls to fuller statement texture, this collection is selected for bounce, fullness, and curl definition that holds beautifully.',
    video: galleryVideoFive,
    poster: deepWaveImage,
    gallery: [deepWaveImage, honeyBlondeImage, galleryFourthImage],
    highlights: ['Defined curl pattern', 'Full-bodied texture', 'Soft lace finish', 'Easy glam styling'],
    products: [featuredProducts[3], featuredProducts[2], featuredProducts[0], featuredProducts[4]],
  },
  'glueless-wigs': {
    eyebrow: 'Easy Wear',
    title: 'Glueless Wigs',
    description:
      'Designed for convenience without losing the luxury feel, our glueless units make it easy to install, style, and move confidently through your day.',
    video: galleryVideoSix,
    poster: gluelessBobImage,
    gallery: [gluelessBobImage, pixieImage, silkBaseImage],
    highlights: ['Quick install', 'Secure fit', 'Beginner-friendly', 'Lightweight comfort'],
    products: [featuredProducts[1], featuredProducts[4], featuredProducts[0], featuredProducts[5]],
  },
  'lace-front-wigs': {
    eyebrow: 'Natural Hairline',
    title: 'Lace Front Wigs',
    description:
      'Our lace front collection is curated for realism, flexible parting, and seamless blending so your finish stays polished and believable up close.',
    video: galleryVideoThree,
    poster: silkBaseImage,
    gallery: [silkBaseImage, deepWaveImage, midnightStraightImage],
    highlights: ['Transparent lace', 'Realistic finish', 'Flexible styling', 'Premium density'],
    products: [featuredProducts[0], featuredProducts[3], featuredProducts[5], featuredProducts[1]],
  },
  'bob-wigs': {
    eyebrow: 'Short & Chic',
    title: 'Bob Wigs',
    description:
      'Sharp lines, wearable length, and polished texture make our bob wig collection perfect for effortless everyday style with a refined edge.',
    video: galleryVideoFour,
    poster: gluelessBobImage,
    gallery: [gluelessBobImage, pixieImage, galleryFourthImage],
    highlights: ['Clean silhouette', 'Low maintenance', 'Everyday versatility', 'Modern finish'],
    products: [featuredProducts[1], featuredProducts[4], featuredProducts[5], featuredProducts[2]],
  },
}

function Layout({ children }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink to="/" className="brand-mark">
          <img src={logo} alt="MandaBelle Hairs logo" className="brand-logo" />
          <div>
            <p className="brand-eyebrow">Luxury Wig Boutique</p>
            <p className="brand-title">MandaBelle Hairs</p>
          </div>
        </NavLink>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact" className="nav-cta">
            Contact Shop
          </NavLink>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-mark">
              <img src={logo} alt="MandaBelle Hairs logo" className="brand-logo" />
              <div>
                <p className="brand-eyebrow">Luxury Wig Boutique</p>
                <p className="brand-title footer-brand-title">MandaBelle Hairs</p>
              </div>
            </div>
            <p>
              Premium hair solutions for the modern woman, with polished styling, trusted service, and
              direct WhatsApp ordering.
            </p>
          </div>

          <div>
            <p className="footer-heading">Quick Links</p>
            <div className="footer-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/gallery">Gallery</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </div>

          <div>
            <p className="footer-heading">Contact Info</p>
            <div className="footer-contact">
              <p>+234 903 572 3731</p>
              <p>mandabelle26@gmail.com</p>
              <p>Lagos Island Boutique Hub, Lagos, Nigeria</p>
            </div>
          </div>

          <div>
            <p className="footer-heading">Newsletter</p>
            <p className="footer-news-copy">Get updates on new arrivals, ready-to-ship units, and sales.</p>
            <div className="footer-newsletter">
              <input type="email" placeholder="Your email" aria-label="Your email" />
              <button type="button">Join</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>(c) 2026 MandaBelle Hairs. All rights reserved.</span>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Order via WhatsApp: +2349035723731
          </a>
        </div>
      </footer>
    </div>
  )
}

function HomePage() {
  return (
    <Layout>
      <section className="hero-panel">
        <p className="hero-pill">Ready to Ship Worldwide</p>
        <h1>
          Beautiful, Natural Wigs
          <span>Ready to Ship.</span>
        </h1>
        <p className="hero-text home-hero-text">
          Premium quality human hair and refined ready-to-wear units designed to help you feel polished,
          confident, and beautifully put together every day. Free delivery is available within Nigeria,
          and we ship worldwide for clients looking for luxury wigs from anywhere.
        </p>
        <div className="hero-actions hero-actions-centered">
          <NavLink to="/products" className="button button-primary">
            Browse Collection
          </NavLink>
          <NavLink to="/about" className="button button-secondary">
            Our Process
          </NavLink>
        </div>
      </section>

      <section className="products-showcase">
        <div className="section-heading-row">
          <div>
            <p className="section-tag">Featured Collection</p>
            <h2>Our Latest Products</h2>
            <p className="section-copy">
              Discover premium units selected for texture, density, comfort, and effortless elegance.
            </p>
          </div>
          <NavLink to="/products" className="section-link">
            View All Collection
          </NavLink>
        </div>

        <div className="product-grid product-grid-home">
          {featuredProducts.map((product) => (
            <article key={product.name} className="product-card product-card-guide">
              <div className={`product-visual ${product.tone}`}>
                <span className="product-pill">{product.category}</span>
                <img src={product.image} alt={product.name} className="product-visual-image" />
              </div>
              <div className="product-content">
                <div className="product-heading">
                  <h3>{product.name}</h3>
                  <strong>{product.price}</strong>
                  <span>Length: {product.length}</span>
                </div>
                <p>{product.detail}</p>
                <a href={whatsappUrl} className="button product-order" target="_blank" rel="noreferrer">
                  Order via WhatsApp
                </a>
                <span className="product-note">Direct chat with MandaBelle Hairs at +2349035723731</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-panel">
        <div className="section-heading-row">
          <div className="trust-content">
            <p className="section-tag">Trusted Service</p>
            <h2>What You Order Is What You Get</h2>
            <p className="section-copy">
              MandaBelle Hairs is a trusted online store for luxury human hair wigs. Orders within Nigeria
              are delivered within 7 business days after payment, while international delivery is handled
              with agreed courier pricing per destination.
            </p>
          </div>
        </div>
      </section>

      <section className="about-split">
        <div className="about-visual-panel">
          <video
            className="about-visual media-cover"
            src={aboutVideo}
            poster={aboutPosterImage}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="about-stat">
            <strong>10k+</strong>
            <span>Happy Customers</span>
          </div>
        </div>

        <div className="about-copy">
          <p className="section-tag">About MandaBelle Hairs</p>
          <h3>A wig boutique built around quality, confidence, and customer care.</h3>
          <p>
            We believe hair is an extension of your personality, so every unit in our collection is chosen to
            deliver beauty, comfort, and a natural finish without compromising on quality.
          </p>
          <p>
            Whether you want a statement look or an easy everyday favorite, our team is here to help you
            find a beautiful match and get it to you quickly.
          </p>
          <div className="support-grid">
            {supportHighlights.map((item) => (
              <article key={item.title} className="support-card">
                <span className="support-icon">+</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

function AboutPage() {
  return (
    <Layout>
      <section className="about-page-hero">
        <div className="about-page-copy">
          <p className="about-page-pill">Our Journey & Mission</p>
          <h1>
            About <span>MandaBelle Hairs</span>
          </h1>
          <p>
            Founded on the belief that every woman deserves to feel confident and beautiful, MandaBelle
            Hairs has grown from a passion project into a trusted destination for premium wigs and polished
            hair solutions.
          </p>
          <p>
            Our mission is simple: remove the guesswork from buying wigs online. Every piece is carefully
            selected for texture, density, finish, and comfort so what you see is exactly what you receive.
          </p>
          <p>
            You can trust MandaBelle Hairs as a reliable online store. What you order is what you get, and
            orders within Nigeria are delivered within 7 business days after payment, while international
            shipping is organized with courier pricing agreed per destination.
          </p>
          <p>
            Based in Lagos, we serve women who want luxury texture, easy styling, and reliable service,
            with direct WhatsApp support that keeps the shopping experience personal from start to finish.
          </p>
          <NavLink to="/products" className="button button-primary">
            Explore Our Products
          </NavLink>
        </div>
      </section>

      <section className="team-section">
        <div className="team-heading">
          <p className="section-tag">Our Gallery</p>
          <h2>Inside MandaBelle Hairs</h2>
          <p className="section-copy">
            A moving showcase of some of the textures, finishes, and signature looks our clients love most.
          </p>
        </div>

        <div className="about-slideshow" aria-label="MandaBelle Hairs image slideshow">
          <div className="about-slideshow-track">
            {[...aboutSlideshowImages, ...aboutSlideshowImages].map((item, index) => (
              <figure key={`${item.alt}-${index}`} className="about-slide">
                <img src={item.image} alt={item.alt} className="about-slide-image" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta-panel">
        <div className="about-cta-icon">+</div>
        <h2>Ready to Transform Your Look?</h2>
        <p>
          Have questions about a specific unit? Our specialists are available on WhatsApp to share guidance,
          styling advice, and direct ordering support in real time.
        </p>
        <a href={whatsappUrl} className="button whatsapp-cta" target="_blank" rel="noreferrer">
          Chat on WhatsApp
        </a>
        <span className="about-cta-line">Direct Line: +234 903 572 3731</span>
      </section>
    </Layout>
  )
}

function ProductsPage() {
  return (
    <Layout>
      <section className="product-detail-page">
        <div className="product-breadcrumbs">
          <NavLink to="/">Home</NavLink>
          <strong>Products</strong>
        </div>

        <div className="recommendation-grid">
          {featuredProducts.map((product) => (
            <article key={product.name} className="recommendation-card">
              <div className={`recommendation-visual ${product.tone}`}>
                <span className="recommendation-tag">{product.category}</span>
                <img src={product.image} alt={product.name} className="recommendation-image" />
              </div>
              <div className="recommendation-content">
                <h3>{product.name}</h3>
                <div className="recommendation-meta">
                  <strong>{product.price}</strong>
                  <span>Length: {product.length}</span>
                  <NavLink to="/contact">Order Now</NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="related-products">
        <div className="recommendation-grid">
          {galleryVideos.map((video) => (
            <article key={video.title} className="recommendation-card">
              <div className="recommendation-visual">
                <video className="recommendation-video" autoPlay controls muted playsInline poster={video.poster}>
                  <source src={video.video} type="video/mp4" />
                </video>
              </div>
              <div className="recommendation-content">
                <h3>{video.title}</h3>
                <p>{video.detail}</p>
                <NavLink to={video.href}>View Collection</NavLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function CollectionPage({ page }) {
  return (
    <Layout>
      <div className="product-breadcrumbs">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <strong>{page.title}</strong>
      </div>

      <section className="collection-page-hero">
        <div>
          <p className="section-tag">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="collection-page-copy">{page.description}</p>
          <div className="hero-actions">
            <a href={whatsappUrl} className="button button-primary" target="_blank" rel="noreferrer">
              Order via WhatsApp
            </a>
            <NavLink to="/gallery" className="button button-secondary">
              Back to Gallery
            </NavLink>
          </div>
        </div>

        <video className="collection-hero-video" controls poster={page.poster} muted playsInline>
          <source src={page.video} type="video/mp4" />
        </video>
      </section>

      <section className="collection-showcase">
        <div className="collection-stills">
          {page.gallery.map((image, index) => (
            <img key={`${page.title}-${index}`} src={image} alt={`${page.title} preview ${index + 1}`} className="collection-still" />
          ))}
        </div>

        <div className="collection-details">
          <p className="section-tag">Why This Collection</p>
          <h2>Selected for finish, movement, and premium presentation.</h2>
          <div className="feature-bullets">
            {page.highlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="related-products">
        <div className="section-heading-row">
          <div>
            <p className="section-tag">Featured Picks</p>
            <h2>Shop This Collection</h2>
            <p className="section-copy">A few matched units from this category to help you choose faster.</p>
          </div>
        </div>

        <div className="recommendation-grid">
          {page.products.map((product) => (
            <article key={product.name} className="recommendation-card">
              <div className={`recommendation-visual ${product.tone}`}>
                <span className="recommendation-tag">{product.category}</span>
                <img src={product.image} alt={product.name} className="recommendation-image" />
              </div>
              <div className="recommendation-content">
                <h3>{product.name}</h3>
                <div className="recommendation-meta">
                  <strong>{product.price}</strong>
                  <span>Length: {product.length}</span>
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    Order
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

function GalleryPage() {
  return (
    <Layout>
      <div className="product-breadcrumbs">
        <NavLink to="/">Home</NavLink>
        <strong>Gallery</strong>
      </div>

      <section className="gallery-page-hero">
        <p className="section-tag">Video Gallery</p>
        <h1>Watch The Hair In Motion</h1>
        <p className="gallery-page-copy">
          Explore installs, texture reveals, styling clips, and ready-to-ship units through our curated
          video gallery. Every clip gives you a closer look at movement, density, and finish before you
          order.
        </p>
      </section>

      <section className="collection-link-grid">
        {galleryCollections.map((item) => (
          <NavLink key={item.slug} to={`/${item.slug}`} className="collection-link-card">
            <img src={item.poster} alt={item.title} className="collection-link-image" />
            <div className="collection-link-copy">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          </NavLink>
        ))}
      </section>

      <section className="video-gallery-grid">
        {galleryVideos.map((item) => (
          <article key={item.title} className="video-card">
            <video className="video-card-player" autoPlay controls preload="metadata" poster={item.poster} muted playsInline>
              <source src={item.video} type="video/mp4" />
            </video>
            <div className="video-card-copy">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <NavLink to={item.href} className="video-card-link">
                View Matching Collection
              </NavLink>
            </div>
          </article>
        ))}
      </section>

      <section className="gallery-cta-strip">
        <div>
          <p className="section-tag">Need More Angles?</p>
          <h2>Message us for extra videos, live photos, and current availability.</h2>
        </div>
        <a href={whatsappUrl} className="button button-primary" target="_blank" rel="noreferrer">
          Chat on WhatsApp
        </a>
      </section>
    </Layout>
  )
}

function ProductEditorPage() {
  const storageKey = 'mandabelle-product-editor'
  const [entries, setEntries] = useState({})

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey)
    if (saved) {
      try {
        setEntries(JSON.parse(saved))
      } catch {
        setEntries({})
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(entries))
  }, [entries])

  const groupedMedia = useMemo(() => {
    const groups = new Map()

    for (const item of editorMediaLibrary) {
      const existing = groups.get(item.key) ?? {
        key: item.key,
        name: item.stem,
        image: null,
        video: null,
      }

      if (item.type === 'image' && !existing.image) {
        existing.image = item
      }

      if (item.type === 'video' && !existing.video) {
        existing.video = item
      }

      groups.set(item.key, existing)
    }

    return Array.from(groups.values())
  }, [])

  useEffect(() => {
    setEntries((current) => {
      const updated = { ...current }
      for (const item of groupedMedia) {
        if (item.key.includes('bounce') || item.key.includes('bouncy')) {
          if (!updated[item.key]) {
            updated[item.key] = { texture: '', length: '', price: '' }
          }
          updated[item.key].price = '₦345k - ₦780k'
          updated[item.key].length = '14 inches - 32 inches'
        } else if (item.key.includes('bone-straight')) {
          if (!updated[item.key]) {
            updated[item.key] = { texture: '', length: '', price: '' }
          }
          updated[item.key].price = '₦275k - ₦1.2m'
          updated[item.key].length = '10 inches - 32 inches'
        } else if (item.key.includes('straight') && !item.key.includes('bone-straight')) {
          if (!updated[item.key]) {
            updated[item.key] = { texture: '', length: '', price: '' }
          }
          updated[item.key].price = '₦215k - ₦655k'
          updated[item.key].length = '14 inches - 32 inches'
        } else if (item.key.includes('yaki')) {
          if (!updated[item.key]) {
            updated[item.key] = { texture: '', length: '', price: '' }
          }
          updated[item.key].price = '₦225k - ₦665k'
          updated[item.key].length = '14 inches - 32 inches'
        } else if (item.key.includes('pixie')) {
          if (!updated[item.key]) {
            updated[item.key] = { texture: '', length: '', price: '' }
          }
          updated[item.key].price = '₦375k - ₦860k'
          updated[item.key].length = '14 inches - 32 inches'
        } else if (item.key.includes('jerry')) {
          if (!updated[item.key]) {
            updated[item.key] = { texture: '', length: '', price: '' }
          }
          updated[item.key].price = '₦375k - ₦860k'
          updated[item.key].length = '14 inches - 32 inches'
        } else if (item.key.includes('afro')) {
          if (!updated[item.key]) {
            updated[item.key] = { texture: '', length: '', price: '' }
          }
          updated[item.key].price = '₦315k'
          updated[item.key].length = '14 inches'
        }
      }
      return updated
    })
  }, [groupedMedia])

  const handleChange = (key, field, value) => {
    setEntries((current) => ({
      ...current,
      [key]: {
        texture: '',
        length: '',
        price: '',
        ...current[key],
        [field]: value,
      },
    }))
  }

  const exportText = groupedMedia
    .map((item) => {
      const data = entries[item.key] ?? {}
      return `File: ${item.name}\nTexture: ${data.texture ?? ''}\nLength: ${data.length ?? ''}\nPrice: ${data.price ?? ''}`
    })
    .join('\n\n')

  const downloadExport = () => {
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'product-filled.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Layout>
      <div className="product-breadcrumbs">
        <NavLink to="/">Home</NavLink>
        <strong>Editor</strong>
      </div>

      <section className="editor-page-hero">
        <p className="section-tag">Product Editor</p>
        <h1>Fill Product Details Beside Each File</h1>
        <p className="gallery-page-copy">
          Add `Texture`, `Length`, and `Price` beside each image or video. Your progress is saved in this
          browser, and you can export everything into a text file when you are done.
        </p>
        <div className="hero-actions hero-actions-centered">
          <button type="button" className="button button-primary" onClick={downloadExport}>
            Download Filled Text File
          </button>
        </div>
      </section>

      <section className="editor-grid">
        {groupedMedia.map((item) => {
          const data = entries[item.key] ?? {}

          return (
            <article key={item.key} className="editor-card">
              <div className="editor-preview">
                {item.video ? (
                  <video className="editor-video" controls muted playsInline poster={item.image?.src}>
                    <source src={item.video.src} type="video/mp4" />
                  </video>
                ) : item.image ? (
                  <img src={item.image.src} alt={item.name} className="editor-image" />
                ) : null}
              </div>

              <div className="editor-form">
                <p className="editor-file-label">{item.name}</p>
              <div className="editor-file-meta">
                <span>{data.price || 'Price not set'}</span>
                <span>{data.length || 'Length not set'}</span>
              </div>
                <label className="editor-field">
                  <span>Texture</span>
                  <input
                    type="text"
                    value={data.texture ?? ''}
                    onChange={(event) => handleChange(item.key, 'texture', event.target.value)}
                  />
                </label>
                <label className="editor-field">
                  <span>Length</span>
                  <input
                    type="text"
                    value={data.length ?? ''}
                    onChange={(event) => handleChange(item.key, 'length', event.target.value)}
                  />
                </label>
                <label className="editor-field">
                  <span>Price</span>
                  <input
                    type="text"
                    value={data.price ?? ''}
                    onChange={(event) => handleChange(item.key, 'price', event.target.value)}
                  />
                </label>
              </div>
            </article>
          )
        })}
      </section>
    </Layout>
  )
}

function ContactPage() {
  return (
    <Layout>
      <div className="product-breadcrumbs">
        <NavLink to="/">Home</NavLink>
        <strong>Contact</strong>
      </div>

      <section className="page-hero">
        <p className="section-tag">Contact Us</p>
        <h2>Ready to shop or ask a question? Let's talk on WhatsApp.</h2>
      </section>

      <section className="contact-panel">
        <div>
          <h3>WhatsApp Business Contact</h3>
          <p>
            Click the button below to start a direct conversation with MandaBelle Hairs about available
            styles, pricing, and orders.
          </p>
          <p className="contact-number">+234 903 572 3731</p>
          <p>mandabelle26@gmail.com</p>
        </div>
        <a href={whatsappUrl} className="button button-primary" target="_blank" rel="noreferrer">
          Open WhatsApp
        </a>
      </section>
    </Layout>
  )
}

function SeoUpdater() {
  const location = useLocation()

  useEffect(() => {
    const routeMeta = {
      '/': {
        title: 'MandaBelle Hairs | Luxury Human Hair Wigs Online',
        description:
          'MandaBelle Hairs is a trusted online store offering luxury human hair wigs with free delivery within Nigeria and worldwide shipping options.',
      },
      '/about': {
        title: 'About MandaBelle Hairs | Trusted Wig Boutique',
        description:
          'Learn about MandaBelle Hairs, a trusted wig boutique delivering premium human hair wigs with fast local delivery and global shipping support.',
      },
      '/gallery': {
        title: 'Gallery | MandaBelle Hairs',
        description:
          'Watch our premium wig textures and installs in motion. See real hair movement before you order from MandaBelle Hairs.',
      },
      '/products': {
        title: 'Products | MandaBelle Hairs',
        description:
          'Browse our luxury wig collection with curated premium human hair textures, styles, and ready-to-ship pieces.',
      },
      '/contact': {
        title: 'Contact MandaBelle Hairs',
        description:
          'Contact MandaBelle Hairs via WhatsApp for orders, shipping questions, and styling support for luxury human hair wigs.',
      },
      '/product-editor': {
        title: 'Product Editor | MandaBelle Hairs',
        description:
          'Manage and update product details for wig photos and videos with length, texture, and pricing information.',
      },
    }

    const meta = routeMeta[location.pathname] ?? routeMeta['/']
    document.title = meta.title

    const descriptionTag = document.querySelector('meta[name="description"]')
    if (descriptionTag) {
      descriptionTag.setAttribute('content', meta.description)
    }
  }, [location.pathname])

  return null
}

export default function App() {
  return (
    <>
      <SeoUpdater />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/product-editor" element={<ProductEditorPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/bone-straight-wigs" element={<CollectionPage page={collectionPages['bone-straight-wigs']} />} />
        <Route path="/curly-wigs" element={<CollectionPage page={collectionPages['curly-wigs']} />} />
        <Route path="/glueless-wigs" element={<CollectionPage page={collectionPages['glueless-wigs']} />} />
        <Route path="/lace-front-wigs" element={<CollectionPage page={collectionPages['lace-front-wigs']} />} />
        <Route path="/bob-wigs" element={<CollectionPage page={collectionPages['bob-wigs']} />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}
