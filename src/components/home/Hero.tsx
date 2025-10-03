import React from 'react'
import { motion } from "motion/react";
import { HeroHighlight} from "../ui/hero-highlight";
import { FlipWords } from "../ui/flip-words";
import Home_Navbar from './Home_Navbar';
import { PointerHighlight } from '../ui/pointer-highlight';

const Hero = () => {
    const words=["Create", "Control","Analyze"]
  return (
    <>
  
        <HeroHighlight containerClassName='h-screen' >
        <Home_Navbar/>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
          >
             <FlipWords words={words}/>Link, Manage every single connecttion with
            <PointerHighlight
            rectangleClassName="bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 leading-loose"
            pointerClassName="text-blue-500 h-3 w-3"
            containerClassName="inline-block mx-1"
          >
            <span className="relative z-10">Klickr.</span>
          </PointerHighlight>
          </motion.h1>
        </HeroHighlight>
        </>
  )
}

export default Hero