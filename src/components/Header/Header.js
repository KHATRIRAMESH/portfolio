import Link from "next/link";
import React from "react";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { DiCssdeck } from "react-icons/di";


import { FacebookUrl, GithubUrl, LinkedInUrl } from "../../constants/constants";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-[#0F1624]/80 border-b  rounded-lg border-white/10 w-full flex justify-between items-center p-4 sm:p-2 sm:px-4">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center text-white font-bold text-2xl hover:text-[#13ADC7] transition-colors duration-300"
        >
          <DiCssdeck size="3rem" /> <span className="ml-2">Ramesh</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8">
        <li>
          <Link href="#projects" className="text-xl font-medium text-white/75 hover:text-[#13ADC7] transition-colors duration-300">
            Projects
          </Link>
        </li>
        <li>
          <Link href="#tech" className="text-xl font-medium text-white/75 hover:text-[#13ADC7] transition-colors duration-300">
            Technologies
          </Link>
        </li>
        <li>
          <Link href="#about" className="text-xl font-medium text-white/75 hover:text-[#13ADC7] transition-colors duration-300">
            About
          </Link>
        </li>
        <li>
          <Link href="/blogs" className="text-xl font-medium text-white/75 hover:text-[#13ADC7] transition-colors duration-300">
            Blogs
          </Link>
        </li>
      </div>

      {/* Social Icons (Always visible or hidden on very small? User said 'show all elements... in larger screen', implies keeping them) */}
      <div className="hidden md:flex gap-4 items-center">
        <a href={GithubUrl} className="text-white transition-all duration-300 hover:text-[#13ADC7] hover:-translate-y-1 p-2">
          <AiFillGithub size="3rem" />
        </a>
        <a href={LinkedInUrl} className="text-white transition-all duration-300 hover:text-[#13ADC7] hover:-translate-y-1 p-2">
          <AiFillLinkedin size="3rem" />
        </a>
        {/* <a href={FacebookUrl} className="text-white transition-all duration-300 hover:text-[#13ADC7] hover:-translate-y-1 p-2">
          <AiFillFacebook size="3rem" />
        </a> */}
      </div>

      {/* Mobile Menu Icon */}
      <div className="flex md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
          <div className={`w-8 h-8 flex flex-col justify-around transition-all duration-300 relative`}>
            <span className={`w-full h-1 bg-white rounded-lg transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-3.5' : ''}`} />
            <span className={`w-full h-1 bg-white rounded-lg transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-1 bg-white rounded-lg transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-3.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0F1624] border-b border-white/10 flex flex-col items-center py-6 gap-6 md:hidden shadow-2xl animate-in slide-in-from-top-5 duration-300">
          <Link href="#projects" onClick={() => setIsOpen(false)} className="text-2xl text-white/90 hover:text-[#13ADC7] font-medium">Projects</Link>
          <Link href="#tech" onClick={() => setIsOpen(false)} className="text-2xl text-white/90 hover:text-[#13ADC7] font-medium">Technologies</Link>
          <Link href="#about" onClick={() => setIsOpen(false)} className="text-2xl text-white/90 hover:text-[#13ADC7] font-medium">About</Link>
          <Link href="/blogs" onClick={() => setIsOpen(false)} className="text-2xl text-white/90 hover:text-[#13ADC7] font-medium">Blogs</Link>

          <div className="flex gap-6 mt-4">
            <a href={GithubUrl} className="text-white hover:text-[#13ADC7]">
              <AiFillGithub size="3rem" />
            </a>
            <a href={LinkedInUrl} className="text-white hover:text-[#13ADC7]">
              <AiFillLinkedin size="3rem" />
            </a>
            <a href={FacebookUrl} className="text-white hover:text-[#13ADC7]">
              <AiFillFacebook size="3rem" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;


