import React from "react";
import { AiFillFacebook, AiFillGithub, AiFillLinkedin } from "react-icons/ai";


import {
  FacebookUrl,
  GithubUrl,
  LinkedInUrl,
  MobileNumber,
  PersonalEmail,
  FooterData,
} from "../../constants/constants";

const Footer = () => {
  return (
    <section className="w-[calc(100vw-96px)] max-w-5xl p-[2rem_48px_40px] m-[1rem_auto] box-content sm:p-[0_16px_48px] sm:w-[calc(100vw-32px)]">
      <ul className="border-t border-white/10 grid grid-cols-[repeat(3,minmax(85px,220px))] gap-10 p-[40px_0_28px] lg:p-[32px_0_16px] md:w-full md:p-[32px_0_16px] md:gap-4 sm:w-full sm:p-[32px_4px_16px] sm:gap-[5px]">
        <div className="flex flex-col max-w-[220px] w-full">
          <h4 className="font-semibold text-xs leading-6 uppercase text-white mb-4 sm:text-[10px] sm:leading-[12px] sm:mb-2">Call</h4>
          <a href={`tel:${MobileNumber}`} className="text-lg leading-[30px] text-white mb-4 transition duration-300 relative left-0 hover:text-white hover:left-1.5 md:text-base md:leading-7 md:flex sm:text-[8px] sm:leading-[14px] sm:mb-2 sm:flex sm:items-center">
            {MobileNumber}
          </a>
        </div>
        <div className="flex flex-col max-w-[220px] w-full">
          <h4 className="font-semibold text-xs leading-6 uppercase text-white mb-4 sm:text-[10px] sm:leading-[12px] sm:mb-2">Email</h4>
          <a href={`mailto:${PersonalEmail}`} className="text-lg leading-[30px] text-white mb-4 transition duration-300 relative left-0 hover:text-white hover:left-1.5 md:text-base md:leading-7 md:flex sm:text-[8px] sm:leading-[14px] sm:mb-2 sm:flex sm:items-center">
            {PersonalEmail}
          </a>
        </div>
      </ul>
      <div className="max-w-5xl flex justify-between md:flex md:justify-between sm:flex sm:w-full sm:flex-col">
        <div className="flex items-baseline flex-wrap mr-auto md:flex-col md:items-baseline sm:flex sm:flex-col sm:m-[0_0_32px] sm:items-center">
          <p className="color-white min-w-[280px] tracking-[0.02em] text-lg leading-[30px] p-4 text-white md:text-base md:leading-7 sm:leading-[22px] sm:text-sm sm:min-w-[100px]">
            {FooterData.slogan}
          </p>
        </div>
        <div className="flex items-center md:justify-center md:pr-4 md:flex-wrap">
          <a href={GithubUrl} target="_blank" className="text-white transition duration-300 hover:bg-[#212d45] hover:scale-125 rounded-full p-2">
            <AiFillGithub size="3rem" />
          </a>
          <a href={LinkedInUrl} target="_blank" className="text-white transition duration-300 hover:bg-[#212d45] hover:scale-125 rounded-full p-2">
            <AiFillLinkedin size="3rem" />
          </a>
          {/* <a href={FacebookUrl} target="_blank" className="text-white transition duration-300 hover:bg-[#212d45] hover:scale-125 rounded-full p-2">
            <AiFillFacebook size="3rem" />
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default Footer;
