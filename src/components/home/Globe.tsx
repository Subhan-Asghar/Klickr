"use client";
import React from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

import {globeConfig,sampleArcs} from "@/data/globe_data"
const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});

export function Globe() {
 
  return (
    <div className="flex flex-row items-center justify-center py-20 h-screen md:h-auto dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-[40rem] px-4">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
<div className="text-center text-xl md:text-4xl font-bold text-black dark:text-white ">
<PointerHighlight
            rectangleClassName="bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 leading-loose"
            pointerClassName="text-blue-500 h-3 w-3"
            containerClassName="inline-block mx-1"
          >
            <span className="relative z-10">The Last Link You&apos;ll Ever Need</span>
          </PointerHighlight>

</div>
<p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-md mt-2 mx-auto">
Create, Share, and Control.
 Change the destination of any shared link instantly, without ever updating your old posts or content.
 It’s link management, perfected.
</p> </motion.div>
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" />
        <div className="absolute w-full -bottom-20 h-72 md:h-full z-10">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </div>
  );
}
