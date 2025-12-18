import React from "react";
import { projects } from "../../constants/constants";

const Projects = () => (
  // Section nopadding id="projects"
  <section className="flex flex-col p-0 mx-auto max-w-5xl box-content relative overflow-hidden bg-[#0F1624] gap-10 sm:p-0 sm:w-full" id="projects">
    <div className="w-16 h-1.5 rounded-[10px] bg-gradient-to-r from-[#13ADC7] to-[#945DD6] my-16 sm:w-8 sm:h-0.5 md:w-12 md:h-1" />
    <h2 className="font-extrabold text-[65px] leading-[72px] mb-4 py-4 text-white sm:text-[28px] sm:leading-[32px] md:text-[56px] md:leading-[56px] w-full">Projects</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-12 gap-8 sm:p-4">
      {projects.map((p, i) => {
        return (
          <div key={i} className="bg-[#0F1624] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full border border-white/5">
            <div className="relative h-52 w-full overflow-hidden">
              <img src={p.image} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" alt={p.title} />
            </div>

            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-2xl font-bold text-[#9cc9e3] mb-4 text-center tracking-wide">
                {p.title}
              </h3>
              <div className="w-12 h-1 bg-[#d0bb57] mx-auto rounded-full mb-6 relative z-10"></div>

              <p className="text-[#e4e6e7] text-base leading-relaxed text-justify mb-8 flex-1">
                {p.description}
              </p>

              <div className="mt-auto">
                <div className="text-center text-lg font-semibold text-white mb-4">Stack</div>
                <ul className="flex flex-wrap justify-center gap-3 mb-8">
                  {p.tags.map((t, i) => {
                    return (
                      <li key={i} className="text-[#d8bfbf] text-sm px-3 py-1 bg-white/5 rounded-full border border-white/10">
                        {t}
                      </li>
                    );
                  })}
                </ul>

                <div className="flex justify-around gap-4">
                  {p.visit && (
                    <a href={p.visit} target="_blank" className="flex-1 text-center text-white text-sm font-semibold py-3 px-6 bg-[#6b3030] rounded-lg transition-colors duration-300 hover:bg-[#801414]">
                      Code
                    </a>
                  )}
                  {p.source && (
                    <a href={p.source} target="_blank" className="flex-1 text-center text-white text-sm font-semibold py-3 px-6 bg-[#6b3030] rounded-lg transition-colors duration-300 hover:bg-[#801414]">
                      Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default Projects;
