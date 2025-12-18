import React from "react";
import { DiFirebase, DiReact, DiZend } from "react-icons/di";

const Technologies = () => (
  <section className="flex flex-col p-12 sm:p-4 md:p-6 mx-auto max-w-5xl box-content bg-[#0F1624] gap-10 sm:w-full" id="tech">
    <div className="w-16 h-1.5 rounded-[10px] bg-gradient-to-r from-[#13ADC7] to-[#945DD6] my-16 sm:w-8 sm:h-0.5 md:w-12 md:h-1" />
    <h2 className="font-extrabold text-[56px] leading-[56px] mb-4 text-white sm:text-[28px] sm:leading-[32px] md:text-[48px]">
      Technologies
    </h2>
    <p className="max-w-3xl text-2xl leading-10 font-light pb-12 text-white sm:text-base sm:leading-6 md:text-xl md:max-w-2xl">
      Backend-focused fullstack engineer specializing in scalable server-side systems and distributed architectures.
    </p>

    <div className="w-full mb-10">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <li className="bg-[#0F1624] rounded-xl p-6 border border-white/10 hover:border-[#13ADC7] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(19,173,199,0.15)] flex flex-col items-start h-full">
          <div className="bg-white/5 p-3 rounded-lg mb-4 text-[#13ADC7]">
            <DiFirebase size="2.5rem" />
          </div>
          <h4 className="font-bold text-2xl text-white mb-3">Backend</h4>
          <p className="text-gray-300 text-sm leading-6">
            Node.js, NestJS, ExpressJS<br />
            GraphQL, REST, Socket.io<br />
            Stripe Integration, BullMQ<br />
            Microservices
          </p>
        </li>
        <li className="bg-[#0F1624] rounded-xl p-6 border border-white/10 hover:border-[#13ADC7] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(19,173,199,0.15)] flex flex-col items-start h-full">
          <div className="bg-white/5 p-3 rounded-lg mb-4 text-[#13ADC7]">
            <DiReact size="2.5rem" />
          </div>
          <h4 className="font-bold text-2xl text-white mb-3">Frontend</h4>
          <p className="text-gray-300 text-sm leading-6">
            React, Next.js, Tailwind CSS<br />
            Zustand, UI Component Design<br />
            HTML5, CSS3, JavaScript
          </p>
        </li>
        <li className="bg-[#0F1624] rounded-xl p-6 border border-white/10 hover:border-[#13ADC7] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(19,173,199,0.15)] flex flex-col items-start h-full">
          <div className="bg-white/5 p-3 rounded-lg mb-4 text-[#13ADC7]">
            <DiFirebase size="2.5rem" />
          </div>
          <h4 className="font-bold text-2xl text-white mb-3">Database</h4>
          <p className="text-gray-300 text-sm leading-6">
            PostgreSQL, MongoDB<br />
            Redis (Caching)<br />
            Optimization & Indexing
          </p>
        </li>
        <li className="bg-[#0F1624] rounded-xl p-6 border border-white/10 hover:border-[#13ADC7] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(19,173,199,0.15)] flex flex-col items-start h-full">
          <div className="bg-white/5 p-3 rounded-lg mb-4 text-[#13ADC7]">
            <DiZend size="2.5rem" />
          </div>
          <h4 className="font-bold text-2xl text-white mb-3">Cloud & DevOps</h4>
          <p className="text-gray-300 text-sm leading-6">
            Google Cloud (GCP), Cloud Run<br />
            Docker, GitHub Actions CI/CD<br />
            Cloud Storage, Secrets Mgmt<br />
            Git, API Gateway
          </p>
        </li>
      </ul>
    </div>
    <div className="w-full h-1.5 rounded-[10px] bg-gradient-to-r from-[#F46737] to-[#945DD6] sm:w-8 sm:h-0.5 md:w-12 md:h-1" />
  </section>
);

export default Technologies;
