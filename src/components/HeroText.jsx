import { FlipWords } from "./FlipWords";
import { motion } from "framer-motion";

const HeroText = () => {
  const words = ["Secure", "Modern", "Scalable"];

  // Animation variants for cleaner code
  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 1 },
    },
    hidden: {},
  };

  const itemVariants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, x: -50 },
  };

  return (
    <motion.div 
      className="text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* --- Desktop View --- */}
      <div className="flex-col hidden md:flex">
        <motion.h1 variants={itemVariants} className="font-medium text-3xl lg:text-4xl">
          Hi I'm Praveen
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p variants={itemVariants} className="font-medium text-neutral-300 text-4xl lg:text-5xl">
            A Developer <br /> Dedicated to Crafting
          </motion.p>
          <motion.div variants={itemVariants}>
            <FlipWords
              words={words}
              className="font-black text-white text-7xl lg:text-8xl"
            />
          </motion.div>
          <motion.p variants={itemVariants} className="font-medium text-neutral-300 text-3xl lg:text-4xl">
            Web Solutions
          </motion.p>
        </div>
      </div>

      {/* --- Mobile View --- */}
      <div className="flex flex-col text-center space-y-2 md:hidden">
        <motion.p variants={itemVariants} className="font-medium text-3xl">
          Hi, I'm Praveen
        </motion.p>
        <div>
          <motion.p variants={itemVariants} className="font-black text-neutral-300 text-4xl">
            Building
          </motion.p>
          <motion.div variants={itemVariants}>
            <FlipWords
              words={words}
              className="font-bold text-white text-6xl"
            />
          </motion.div>
          <motion.p variants={itemVariants} className="font-black text-neutral-300 text-4xl">
            Web Applications
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroText;