import React from "react";
import { TimeLineData } from "../../constants/constants";

const Timeline = () => {
  return (
    <section className="flex flex-col p-12 sm:p-4 md:p-6 mx-auto max-w-5xl box-content bg-[#0F1624] relative overflow-hidden sm:w-full" id="about">
      <div className="w-16 h-1.5 rounded-[10px] bg-gradient-to-r from-[#13ADC7] to-[#945DD6] my-16 sm:w-8 sm:h-0.5 md:w-12 md:h-1" />
      <h2 className="font-extrabold text-[56px] leading-[56px] mb-4 text-white sm:text-[28px] sm:leading-[32px] md:text-[48px]">
        About Me
      </h2>
      <p className="max-w-3xl text-2xl leading-10 font-light pb-12 text-white sm:text-base sm:leading-6 md:text-xl md:max-w-2xl">
        Experienced Full Stack Backend & DevOps Engineer with over 2 years of
        experience. Passionate about delivering high-quality web solutions with
        a strong foundation in Node.js. Committed to writing clean code,
        providing exceptional user experiences, and staying updated with
        industry trends for innovative solutions.
      </p>

      <div className="max-w-5xl bg-[#0F1624] p-8 flex flex-col justify-between mb-20 rounded-[10px] ml-8 sm:ml-0 sm:mb-6 sm:pl-4">
        {TimeLineData.map((item, index) => (
          <div key={index} className="flex flex-row items-start mb-6 relative last:mb-0">
            <h4 className="font-bold text-2xl leading-8 tracking-[0.02em] text-white mr-6 min-w-[80px] sm:text-lg sm:leading-7 sm:min-w-[60px] sm:mr-4">
              {item.year}
            </h4>
            <div className="w-3 h-3 rounded-full bg-gradient-to-l from-[#13ADC7] to-[#945DD6] z-10 mt-2.5" />

            {/* Show connecting line for all except the last item */}
            {index !== TimeLineData.length - 1 && (
              <div className="absolute top-2.5 left-[85px] w-0.5 h-full bg-gradient-to-b from-[#13ADC7] to-[#945DD6] opacity-50 z-0 sm:left-[65px]" />
            )}

            <p className="text-base leading-6 tracking-[0.02em] text-white ml-2.5 max-w-[600px] sm:text-sm sm:leading-[22px]">
              {item.text}
            </p>
          </div>
        ))}
      </div>
      <div className="w-16 h-1.5 rounded-[10px] bg-white opacity-10 my-16 sm:w-8 sm:h-0.5 md:w-12 md:h-1" />
    </section>
  );
};

export default Timeline;
