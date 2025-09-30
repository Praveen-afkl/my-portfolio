import React from "react";
// import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
// import Experiences from "./sections/Experiences";
// import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';

const App = () => {
  return (
    <>
      {/* These components are now full-width */}
      {/* <Navbar /> */}
      <Hero />

      {/* Wrap the rest of your sections in a container to center them */}
      <main className="container mx-auto max-w-7xl">
        <About />
        <Projects />
        {/* <Experiences /> */}
        {/* <Testimonial /> */}
        <Contact />
      </main>

      {/* The footer can also be full-width if you want */}
      <Footer />
    </>
  );
};

export default App;