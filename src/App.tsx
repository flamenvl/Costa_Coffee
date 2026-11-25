
import { useEffect, useState } from "react";
import CoffeeScene from "./components/CoffeeScene";
import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
import "./App.css";

const imagePath = (filename: string) =>
  `${import.meta.env.PROD ? "/Costa_Coffee/" : "/"}images/${filename}`;

const coffeeBackgroundStyle = {
  "--coffee-background": `url("${imagePath("costa_coffee.png")}")`,
} as React.CSSProperties;

const drinks = [
{
  number: "01",
  name: "Flat White",
  description: "Rich espresso balanced with silky steamed milk.",
  price: "€3.80",
  category: "CLASSIC",
  type: "CLASSIC",
  image: imagePath("flat-white.jpg"),
},
  {
    number: "02",
    name: "Cappuccino",
    description: "A timeless combination of espresso and velvety foam.",
    price: "€3.60",
    category: "CLASSIC",
    type: "CLASSIC",
    image: imagePath("cappuccino.jpg")

  },
  {
    number: "03",
    name: "Caramel Latte",
    description: "Smooth espresso, steamed milk and sweet caramel.",
    price: "€4.50",
    category: "SIGNATURE",
    type: "SIGNATURE",
    image: imagePath("caramel-latte.jpg"),

  },
  {
    number: "04",
    name: "Mocha",
    description: "Espresso blended with rich chocolate and milk.",
    price: "€4.40",
    category: "SIGNATURE",
    type: "SIGNATURE",
    image: imagePath("mocha.jpg"),

  },
  {
    number: "05",
    name: "Iced Latte",
    description: "A refreshing espresso served over chilled milk.",
    price: "€4.20",
    category: "ICED",
    type: "ICED",
    image: imagePath("iced-latte.jpg"),

  },
  {
    number: "06",
    name: "Iced Americano",
    description: "Bold espresso, chilled water and ice.",
    price: "€3.50",
    category: "ICED",
    type: "ICED",
    image: imagePath("iced-americano.jpg"),

  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  const [activeCategory, setActiveCategory] = useState("ALL");

const categories = ["ALL", "CLASSIC", "SIGNATURE", "ICED"];

const filteredDrinks =
  activeCategory === "ALL"
    ? drinks
    : drinks.filter(
        (drink) => drink.type === activeCategory
      );

useEffect(() => {
  const sections = ["home", "coffee", "menu", "story", "contact"];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-25% 0px -65% 0px",
    }
  );

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  return () => observer.disconnect();
}, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          COSTA<span>®</span>
          <small>COFFEE</small>
        </a>

<nav
  className={menuOpen ? "nav-links open" : "nav-links"}
  id="main-navigation"
>
  <a
    href="#coffee"
    className={activeSection === "coffee" ? "active" : ""}
    onClick={closeMenu}
  >
    Our Coffee
  </a>

  <a
    href="#menu"
    className={activeSection === "menu" ? "active" : ""}
    onClick={closeMenu}
  >
    Menu
  </a>

  <a
    href="#story"
    className={activeSection === "story" ? "active" : ""}
    onClick={closeMenu}
  >
    Our Story
  </a>

  <a
    href="#contact"
    className={activeSection === "contact" ? "active" : ""}
    onClick={closeMenu}
  >
    Contact
  </a>
</nav>

        <a href="#menu" className="nav-cta">
          Explore menu <ArrowUpRight size={16} />
        </a>


<button
  type="button"
  className="mobile-menu"
  onClick={() => setMenuOpen((prev) => !prev)}
  aria-label={menuOpen ? "Close navigation" : "Open navigation"}
  aria-expanded={menuOpen}
  aria-controls="main-navigation"
>
  {menuOpen ? <X /> : <Menu />}
</button>

      </header>

      <CoffeeScene />
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            MORE THAN JUST COFFEE
          </div>

          <h1>
            A little
            <br />
            moment of
            <br />
            <span>pleasure.</span>
          </h1>

          <p className="hero-description">
            Life is too short for ordinary coffee.
            Discover the art of a perfectly crafted cup
            and make every moment count.
          </p>

          <div className="hero-actions">
            <a href="#menu" className="primary-button">
              Discover our coffee
              <ArrowUpRight size={18} />
            </a>

            <a href="#story" className="text-link">
              Our story <span>↗</span>
            </a>
          </div>

          <div className="hero-bottom">
            <span>EST. 1971 — LONDON</span>
            <span>01 / 05</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-circle circle-one" />
          <div className="visual-circle circle-two" />

          <div className="coffee-caption caption-top">
            <span>01 — THE ORIGINAL</span>
          </div>

          {/* Temporary cup placeholder.
              We will replace it with a real 3D model. */}
          

          <div className="coffee-caption caption-bottom">
            <span>MOCHA ITALIA BLEND</span>
            <span>36° 36' / 02° 18'</span>
          </div>

          <div className="visual-number">C.</div>
        </div>

        <div className="hero-scroll">
          <span className="scroll-line" />
          SCROLL TO EXPLORE
        </div>
      </section>


     

<section
  className="coffee-section"
  id="coffee"
  style={coffeeBackgroundStyle}
>

  <div className="section-label">
    01 / OUR PHILOSOPHY
  </div>

  <div className="coffee-layout">

    <div className="coffee-copy">

      <div className="coffee-intro">

        <div className="coffee-eyebrow">
          THE ART OF COFFEE
        </div>

        <h2>
          More than
          <br />
          just <span>coffee.</span>
        </h2>

        <div className="coffee-intro-text">
          <p>
            Great coffee is never just about the beans.
            It is about the aroma, the craftsmanship
            and the little moments that make every
            cup worth enjoying.
          </p>
        </div>

      </div>

      <div className="coffee-feature">

        <div className="coffee-feature-top">
          <span>OUR SIGNATURE BLEND</span>
          <span>EST. 1971</span>
        </div>

        <h3>Mocha Italia.</h3>

        <p>
          A distinctive blend at the heart of
          the Costa coffee experience.
        </p>

        <div className="coffee-feature-bottom">
          <span>RICH AROMA</span>
          <span>SMOOTH CHARACTER</span>
          <span>MADE WITH PASSION</span>
        </div>

      </div>

      <div className="coffee-values">

        <article>
          <span>01</span>
          <h3>Selected Beans</h3>
          <p>
            Carefully selected coffee beans
            are at the heart of every cup.
          </p>
        </article>

        <article>
          <span>02</span>
          <h3>Expert Craft</h3>
          <p>
            Every cup is prepared with care,
            attention and passion.
          </p>
        </article>

        <article>
          <span>03</span>
          <h3>Every Moment</h3>
          <p>
            Coffee brings people together
            and makes ordinary moments special.
          </p>
        </article>

      </div>

    </div>

    <div className="scene-space" aria-hidden="true" />

  </div>

</section>



      <section className="menu-section" id="menu">
        <div className="section-label">02 / THE MENU</div>

 

<div className="menu-layout">
  <div className="menu-content">

    <div className="menu-topline">
      <span>THE COSTA COLLECTION</span>
      <span>CRAFTED WITH PASSION</span>
    </div>

    <div className="menu-heading">
      <h2>
        Discover your
        <br />
        <span>perfect cup.</span>
      </h2>

      <p>
        From our timeless classics to signature creations,
        discover something worth slowing down for.
      </p>
    </div>

    <div className="menu-filters">
      {categories.map((category) => (
        <button
          key={category}
          className={
            activeCategory === category ? "active" : ""
          }
          onClick={() => setActiveCategory(category)}
        >
          {category === "ALL"
            ? "All drinks"
            : category === "CLASSIC"
            ? "Classics"
            : category === "SIGNATURE"
            ? "Signature"
            : "Iced drinks"}
        </button>
      ))}
    </div>


<div className="drink-grid">
  {filteredDrinks.map((drink) => (
    <article className="drink-card" key={drink.number}>

      <div className="drink-card-top">
        <span>{drink.number} / 06</span>
        <span>{drink.category}</span>
      </div>

<div className="drink-illustration">
  <img
    src={drink.image}
    alt={drink.name}
    loading="lazy"
  />
</div>

      <div className="drink-info">
        <h3>{drink.name}</h3>
        <p>{drink.description}</p>
        <span className="drink-price">{drink.price}</span>

        <div className="drink-card-bottom">
          <span>MADE FOR YOUR MOMENT</span>
          <span>↗</span>
        </div>
      </div>

    </article>
  ))}
</div>


    <p className="menu-note">
      * Illustrative menu and prices for this portfolio concept.
    </p>



<div className="menu-signature">

  <div className="signature-copy">
    <span>OUR SIGNATURE BLEND</span>
    <h3>Mocha Italia.</h3>
  </div>

  <div className="signature-description">
    <p>
      A distinctive blend at the heart of
      the Costa coffee experience.
    </p>
  </div>

  <div className="coffee-beans">
    <span className="coffee-bean bean-one"></span>
    <span className="coffee-bean bean-two"></span>
    <span className="coffee-bean bean-three"></span>
  </div>

  <div className="signature-year">1971</div>

</div>



  <div className="scene-space" aria-hidden="true" />
</div>

</div>


</section>

      

      

<section className="story-section" id="story">

  <div className="story-layout">

    <div className="story-collage">

    {/* LEFT EDITORIAL PANEL */}
    <div className="story-intro-panel">
      <span className="story-kicker">03 / OUR STORY</span>

      <div className="story-intro-copy">
        <span className="story-small-label">THE COSTA HERITAGE</span>

        <h2>
          A story
          <br />
          brewed with
          <br />
          <span>passion.</span>
        </h2>

        <p>
          From a small coffee roastery in London
          to a name recognised around the world.
          Every cup has a story worth sharing.
        </p>
      </div>

      <div className="story-panel-bottom">
        <span>ESTABLISHED IN LONDON</span>
        <strong>1971</strong>
      </div>
    </div>

    {/* MAIN IMAGE */}
    <div className="story-main-image">
      <img
        src={imagePath("story-atmosphere.jpg")}
        alt="Warm coffee shop atmosphere"
      />

      <div className="story-main-overlay">
        <span>THE ART OF COFFEE</span>
        <h3>
          More than coffee.
          <br />
          A feeling.
        </h3>
        <p>
          A space to slow down, connect
          and enjoy the little things.
        </p>
      </div>

      <div className="story-image-index">
        <span>01</span>
        <span>—</span>
        <span>03</span>
      </div>
    </div>

    {/* BOTTOM PHOTO COLLAGE */}
    <div className="story-photo story-photo-one">
      <img
        src={imagePath("story-espresso.jpg")}
        alt="Freshly prepared espresso"
      />
      <span>Morning rituals.</span>
    </div>

    <div className="story-photo story-photo-two">
      <img
        src={imagePath("story-coffee.jpg")}
        alt="Coffee served in a cafe"
      />
      <span>A moment to enjoy.</span>
    </div>

    <div className="story-photo story-photo-three">
      <img
        src={imagePath("story-people.jpg")}
        alt="People enjoying coffee together"
      />
      <span>Made for sharing.</span>
    </div>

     </div>

    <div className="scene-space" aria-hidden="true" />

  </div>

</section>




<footer className="footer" id="contact">
  <div className="footer-main">

    <div className="footer-heading">
      <span className="footer-eyebrow">04 / STAY CONNECTED</span>

      <h2>
        Every good moment
        <br />
        starts with <span>coffee.</span>
      </h2>

      <p>
        Have a question or simply want to say hello?
        We would love to hear from you.
      </p>

      <a
        href="mailto:hello@example.com"
        className="footer-contact-button"
      >
        Get in touch <ArrowUpRight size={18} />
      </a>
    </div>

    <div className="footer-details">

      <div className="footer-brand-block">
        <div className="brand footer-brand">
          COSTA<span>®</span>
          <small>COFFEE</small>
        </div>
        <p>Make every moment a little better.</p>
      </div>

      <div className="footer-column">
        <span>EXPLORE</span>
        <a href="#home">Home</a>
        <a href="#coffee">Our Coffee</a>
        <a href="#menu">Menu</a>
        <a href="#story">Our Story</a>
      </div>

      <div className="footer-column">
        <span>GET IN TOUCH</span>
        <a href="mailto:hello@example.com">Email us ↗</a>
        <a href="#home">Back to top ↑</a>
      </div>

    </div>
  </div>

  <div className="footer-bottom">
    <span>© 2026 COSTA COFFEE — UNOFFICIAL CONCEPT PROJECT</span>
    <span>EST. 1971 · LONDON</span>
  </div>
</footer>

    </main>
  );
}

export default App;
