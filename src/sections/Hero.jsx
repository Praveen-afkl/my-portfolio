import React, { useEffect, useRef, useState } from "react";

// CONFIG
const COLOR_ACCENT = "#a855f7";
const WORDS = ["Component", "Reactive", "Modular"];
const ANIMATION_DURATION = 3000;
const GLITCH_CHARS = "~!@#$%^&*()_+`-={}[]|\\:;\"'<>,.?/";

// -------------------- Styles --------------------
const customStyles = `
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap');

:root {
  --accent: ${COLOR_ACCENT};
  --dark-bg: #040409;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: "Funnel Display", sans-serif;
}

.neon-gradient-bg {
  background: radial-gradient(ellipse at center, #161a31 0%, #040409 100%);
}

.pixel-font {
  font-family: "Pixelify Sans", sans-serif;
}

.text-neon-glow-strong {
  text-shadow: 
    0 0 4px var(--accent),
    0 0 12px var(--accent),
    0 0 20px rgba(168,85,247,0.7),
    0 0 35px rgba(168,85,247,0.5);
}

.btn-frosted {
  color: var(--accent);
  border: 1px solid rgba(168,85,247,0.3);
  background: rgba(168,85,247,0.15);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(168,85,247,0.2);
  transition: all 0.3s ease;
}
.btn-frosted:hover {
  background: rgba(168,85,247,0.25);
  box-shadow: 0 0 30px rgba(168,85,247,0.4);
}

/* Navbar */
.navbar {
  transition: all 0.3s ease;
}
`;

// -------------------- Glitch Effect --------------------
function glitchWord(element, newWord) {
  function getRandomChar() {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }
  let glitchCounter = 0;
  const glitchInterval = setInterval(() => {
    let glitchText = "";
    for (let i = 0; i < newWord.length; i++) glitchText += getRandomChar();
    element.textContent = glitchText;
    glitchCounter++;
    if (glitchCounter > 5) {
      clearInterval(glitchInterval);
      let typeIndex = 0;
      const typeInterval = setInterval(() => {
        element.textContent = newWord.substring(0, typeIndex + 1);
        typeIndex++;
        if (typeIndex === newWord.length) clearInterval(typeInterval);
      }, 50);
    }
  }, 50);
}

// -------------------- NavbarBrand (prank) --------------------
const NavbarBrand = () => {
  const prankWords = [
    "I Told You Not To Click!",
    "DoNotTouch™",
    "Error: YouClickedMe",
    "I’m Watching You",
    "plsNoClick",
    "BRUH",
    "🥴Oops",
    "NotAPraveen",
    "💀404FunNotFound💀",
    "ClickAgainIfYouDare"
  ];

  const [brand, setBrand] = useState("Do NOT Click Me!");

  const handleClick = () => {
    const randomWord = prankWords[Math.floor(Math.random() * prankWords.length)];
    setBrand(randomWord);
  };

  return (
    <h1
      className="text-x font-bold text-white cursor-pointer hover:text-[var(--accent)] transition-all"
      onClick={handleClick}
      title="Click at your own risk!"
    >
      {brand}
    </h1>
  );
};

// -------------------- Navbar --------------------
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = ["Home", "About", "Projects", "Contact"];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="w-full flex justify-between items-center 
          px-4 py-3 border-b border-white/20 
          bg-black/30 backdrop-blur-md shadow-md">
          
          <NavbarBrand />

          <ul className="hidden md:flex gap-6 text-white text-lg">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-[var(--accent)] hover:drop-shadow-[0_0_8px_var(--accent)] transition-all"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div
            className="md:hidden flex flex-col gap-1 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="block w-6 h-0.5 bg-white rounded"></span>
            <span className="block w-6 h-0.5 bg-white rounded"></span>
            <span className="block w-6 h-0.5 bg-white rounded"></span>
          </div>
        </div>

        <ul
          className={`md:hidden mt-2 w-full bg-black/90 text-white flex flex-col items-center gap-4 py-4 border-t border-white/20 transition-all
            ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--accent)] transition-all"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="h-16"></div>
    </>
  );
};

// -------------------- Main App --------------------
const App = () => {
  const wordRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setWordIndex((prev) => (prev + 1) % WORDS.length),
      ANIMATION_DURATION
    );
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (wordRef.current) glitchWord(wordRef.current, WORDS[wordIndex]);
  }, [wordIndex]);

  return (
    <div className="min-h-screen relative neon-gradient-bg overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center text-white"
      >
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Hi, I’m{" "}
            <span className="bg-gradient-to-r from-[#a855f7] via-purple-800 to-[#580499] bg-clip-text text-transparent animate-gradient">
              Praveen
            </span>
          </h1>

          <p className="mt-4 text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-snug text-neutral-300">
            A{" "}
            <span className="bg-gradient-to-r from-[#a855f7] via-purple-800 to-[#7701c6] bg-clip-text text-transparent animate-gradient">
              Front-End Developer
            </span>
            <br />
            Dedicated to crafting interactive and modern
          </p>

          <div className="my-6">
            <span
              ref={wordRef}
              className="pixel-font font-extrabold text-6xl md:text-8xl lg:text-9xl text-white/80 text-neon-glow-strong"
            >
              {WORDS[0]}
            </span>
          </div>

          <p className="text-lg md:text-xl lg:text-2xl text-neutral-400">
            Web Applications that are fast, responsive, and visually engaging.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#contact"
              className="btn-frosted inline-block py-3 px-10 rounded-full font-bold text-lg lg:text-xl hover:animate-pulse"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <style>
          {`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient {
              background-size: 200% 200%;
              animation: gradientShift 4s ease infinite;
            }
            .animate-pulse {
              animation: pulse 1.5s infinite;
            }
            @keyframes pulse {
              0%, 100% { box-shadow: 0 0 20px rgba(168,85,247,0.3); }
              50% { box-shadow: 0 0 35px rgba(168,85,247,0.6); }
            }
          `}
        </style>
      </section>
    </div>
  );
};

export default App;
