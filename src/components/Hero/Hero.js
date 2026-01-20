import React from "react";

import { ResumeUrl, HeroData } from "../../constants/constants";
import { buttonVariants } from "../ui/button";

const Hero = (props) => (
  <>
    <div className="flex flex-col items-start justify-center mx-auto max-w-5xl px-12 py-24 sm:px-6 sm:py-16 bg-[#0F1624] relative overflow-hidden">
      <div className="flex flex-col items-start justify-center w-full">
        <h2 className="font-extrabold text-6xl leading-tight mb-6 text-white sm:text-4xl sm:leading-snug md:text-5xl">
          Hello! <br />
          I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13ADC7] to-[#945DD6]">{HeroData.name}</span>
        </h2>
        <p className="max-w-2xl text-xl leading-8 font-light text-[#e4e6e7] mb-10 sm:text-base sm:leading-7">
          {HeroData.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <a href={ResumeUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg", className: "bg-gradient-to-r from-[#13ADC7] to-[#945DD6] text-white hover:opacity-90 transition-opacity duration-300" })}>
            Resume
          </a>
        </div>
      </div>
    </div>
  </>
);

export default Hero;
