import React, { useEffect, useRef, useState } from "react";

// CONFIG
const COLOR_ACCENT = "#a855f7"; // Violet accent
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

body {
  font-family: "Funnel Display", sans-serif;
  margin: 0;
  padding: 0;
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

/* Frosted Button */
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
  transition: top 0.4s ease, opacity 0.4s ease;
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
// -------------------- Updated Orb3D --------------------
const Orb3D = () => {
  const canvasRef = useRef(null);
  const angle = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const tilt = useRef({ x: 0, y: 0 });
  const wobble = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = [];
    const radius = 180;
    const num = 1500;

    // Initialize particles on sphere
    for (let i = 0; i < num; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * 2 * Math.PI;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      particles.push({ x, y, z, offsetX: 0, offsetY: 0, vx: 0, vy: 0 });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const cx = w > 1024 ? w * 0.75 : w / 2;
      const cy = h / 2;

      const dx = mouse.current.x - cx;
      const dy = mouse.current.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxTiltDistance = 400;
      const tiltFactor = Math.min(dist / maxTiltDistance, 1);

      const targetTiltX = (dy / h) * 0.5 * tiltFactor;
      const targetTiltY = (dx / w) * 0.5 * tiltFactor;
      tilt.current.x += (targetTiltX - tilt.current.x) * 0.08;
      tilt.current.y += (targetTiltY - tilt.current.y) * 0.08;

      wobble.current.x = Math.sin(Date.now() * 0.001) * 0.02;
      wobble.current.y = Math.cos(Date.now() * 0.0012) * 0.02;

      angle.current += 0.002 + wobble.current.x;

      particles.forEach((p) => {
        const cosA = Math.cos(angle.current + wobble.current.y);
        const sinA = Math.sin(angle.current + wobble.current.y);

        let x = p.x * cosA - p.z * sinA;
        let z = p.x * sinA + p.z * cosA;
        let y = p.y;

        x += tilt.current.y * z;
        y += tilt.current.x * z;

        const scale = 300 / (300 + z);
        let px = cx + x * scale;
        let py = cy + y * scale;

        const dxP = px - mouse.current.x;
        const dyP = py - mouse.current.y;
        const particleDist = Math.sqrt(dxP * dxP + dyP * dyP);

        const maxDistance = 180;
        if (particleDist < maxDistance) {
          const angleToMouse = Math.atan2(dyP, dxP);
          const force = (maxDistance - particleDist) / maxDistance;

          const targetX = Math.cos(angleToMouse) * force * 60;
          const targetY = Math.sin(angleToMouse) * force * 60;

          p.vx += (targetX - p.offsetX) * 0.15 + (Math.random() - 0.5) * 1.5;
          p.vy += (targetY - p.offsetY) * 0.15 + (Math.random() - 0.5) * 1.5;

          p.offsetX += p.vx;
          p.offsetY += p.vy;

          p.vx *= 0.75;
          p.vy *= 0.75;
        } else {
          p.offsetX *= 0.88;
          p.offsetY *= 0.88;
          p.vx *= 0.75;
          p.vy *= 0.75;
        }

        px += p.offsetX;
        py += p.offsetY;

        // Particle size with depth effect
        const particleSize = 0.8 * scale * (particleDist < maxDistance ? 1 + ((maxDistance - particleDist) / maxDistance) * 0.5 : 1);

        // Color gradient based on z-depth
        const depthFactor = Math.min(Math.max((z + radius) / (2 * radius), 0), 1); // 0 to 1
        let r = Math.floor(168 + 50 * (1 - depthFactor));
        let g = Math.floor(85 + 50 * depthFactor);
        let b = Math.floor(247);
        let brightness = Math.min(0.7 + (particleDist < maxDistance ? ((maxDistance - particleDist) / maxDistance) * 0.5 : 0), 1);

        ctx.beginPath();
        ctx.arc(px, py, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${brightness})`;
        ctx.shadowColor = `rgba(${r},${g},${b},${brightness})`;
        ctx.shadowBlur = 8 + particleSize;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
};

// -------------------- Updated Navbar ------



const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinks = ["Home", "About", "Projects", "Contact"];

  return (
    <>
      {/* Fixed full-width Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50">
        <div className="w-full flex justify-between items-center px-6 py-3 border-b border-white/20 bg-black/30 backdrop-blur-md shadow-[0_8px_30px_rgba(168,85,247,0.2)] relative
          hover:bg-black/40 hover:backdrop-blur-lg hover:shadow-[0_12px_40px_rgba(168,85,247,0.35)] transition-all duration-300">
          <h1 className="text-xl font-bold text-white">Nu!!</h1>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-6 text-white text-lg">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-[var(--accent)] hover:drop-shadow-[0_0_8px_var(--accent)] transition-all duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <div
            className="md:hidden flex flex-col gap-1 cursor-pointer z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="block w-6 h-0.5 bg-white rounded"></span>
            <span className="block w-6 h-0.5 bg-white rounded"></span>
            <span className="block w-6 h-0.5 bg-white rounded"></span>
          </div>

          {/* Bottom gradient glow */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 blur-xl pointer-events-none animate-pulse-slow"></div>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`md:hidden mt-4 w-full max-w-sm mx-auto bg-black/30 backdrop-blur-md text-white flex flex-col items-center gap-4 py-4 border border-white/20 shadow-md relative transition-all duration-300
            ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"}`}
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-indigo-400/20 blur-xl animate-pulse-slow pointer-events-none"></div>
          {navLinks.map((link) => (
            <li key={link} className="relative z-10">
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[var(--accent)] hover:drop-shadow-[0_0_8px_var(--accent)] transition-all duration-300"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16 md:h-16"></div>
    </>
  );
};


// -------------------- Main --------------------
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
    const nextWord = WORDS[wordIndex];
    if (wordRef.current) glitchWord(wordRef.current, nextWord);
  }, [wordIndex]);

  return (
    <div className="min-h-screen relative neon-gradient-bg overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <Navbar />
      <Orb3D />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex  lg:flex-row items-center justify-center px-6 lg:px-54"
      >
        {/* Left: Text */}
        <div className="relative z-10 text-center lg:text-left max-w-3xl text-white flex-1">
          <h1 className="text-3xl md:text-4xl font-semibold text-neutral-300">
            Hi I'm Praveen,
          </h1>
          <p className="mt-4 text-2xl md:text-3xl lg:text-4xl leading-tight">
            A Front-End Developer <br></br> Dedicated to Crafting
          </p>

          <div className="my-6">
            <span
              ref={wordRef}
              className="pixel-font font-extrabold text-5xl md:text-7xl lg:text-8xl text-white/80 text-neon-glow-strong"
            >
              {WORDS[0]}
            </span>
          </div>

          <p className="text-xl md:text-2xl">Web Applications</p>

          <div className="mt-10">
            <a
              href="#contact"
              className="btn-frosted inline-block py-3 px-10 rounded-full font-bold"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Right: Orb */}
        <div className="hidden lg:block relative flex-1 z-0"></div>
      </section>
    </div>
  );
};

export default App;
