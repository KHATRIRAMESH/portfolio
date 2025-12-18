import React from 'react'

export const DropDownContainer = ({ active, children }) => (
  <div className={`absolute flex flex-col right-[-25%] top-[40px] md:top-[32px] sm:top-[24px] w-[280px] bg-white rounded-[8px] z-[100] py-1 cursor-default overflow-hidden transition-all duration-300 origin-top
    ${active ? 'visible opacity-100 scale-y-100' : 'invisible opacity-0 scale-y-0'}`}
  >
    {children}
  </div>
);

export const DropDownItem = ({ children, ...props }) => (
  <a
    className="w-full flex items-start cursor-pointer transition-all duration-300 px-4 py-3 hover:scale-105 hover:bg-[#eee] hover:shadow-[0_3px_6px_3px_rgba(0,0,0,0.3)] even:hover:shadow-[0_0_8px_4px_rgba(0,0,0,0.3)] [&:nth-of-type(3n)]:hover:shadow-[0_-3px_6px_3px_rgba(0,0,0,0.3)]"
    {...props}
  >
    {children}
  </a>
);

export const DropDownIcon = ({ children }) => (
  <div className="w-8 h-8 mr-4">
    {children}
  </div>
);

export const DropDownTextContainer = ({ children }) => (
  <div className="flex flex-col">
    {children}
  </div>
);

export const DropDownItemTitle = ({ children }) => (
  <h2 className="text-[#0f1624] text-[18px] leading-[26px] text-left">
    {children}
  </h2>
);

export const DropDownItemDesc = ({ children }) => (
  <p className="text-[#0f1624] opacity-50 text-[14px] leading-[22px] text-left">
    {children}
  </p>
);