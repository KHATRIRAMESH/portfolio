import React, { useEffect, useState } from "react";
import axios from "axios";

const defaultData = [
  { number: 6, text: "Open Source Projects" },
  { number: 45, text: "Github Followers" },
  { number: 75, text: "Github Stars" },
];

const Acomplishments = () => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    (async () => {
      const { data: userData } = await getFollowers();
      // console.log(userData);
      if (userData) {
        const newFollowers = data.map((obj) => {
          if (obj.text === "Github Followers") {
            return { ...obj, number: userData.followers };
          }
          return obj;
        });
        setData(newFollowers);
      }
    })();
  }, []);

  return (
    <section className="flex flex-col p-12 sm:p-4 md:p-6 mx-auto max-w-5xl box-content bg-[#0F1624] relative overflow-hidden sm:w-full">
      <h2 className="font-extrabold text-[56px] leading-[56px] mb-4 text-white sm:text-[28px] sm:leading-[32px] md:text-[48px]">
        Personal Achievements
      </h2>
      <div className="w-full grid grid-cols-4 gap-6 my-10 md:gap-4 md:my-8 md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] sm:grid-cols-2 sm:gap-2.5 sm:max-w-[500px] sm:mx-auto sm:my-6">
        {data.map((card, index) => (
          <div key={index} className="bg-[#212D45] rounded-xl h-36 p-6 lg:h-[210px] md:h-[135px] md:p-4 sm:h-[110px] sm:p-3 sm:nth-[2n]:row-start-2">
            <h5 className="font-semibold text-4xl leading-10 tracking-[0.01em] text-white mb-2 md:text-[28px] md:leading-8 sm:text-2xl sm:leading-[26px]">
              {`${card.number}+`}
            </h5>
            <p className="text-lg leading-6 tracking-[0.02em] text-white md:text-base md:leading-5 sm:text-[10px] sm:leading-[14px]">
              {card.text}
            </p>
          </div>
        ))}
      </div>
      <div className="w-16 h-1.5 rounded-[10px] bg-white opacity-10 my-16 sm:w-8 sm:h-0.5 md:w-12 md:h-1" />
    </section>
  );
};

export default Acomplishments;

const getFollowers = () => {
  return axios.get(
    "https://api.github.com/users/tanv33"
    // "https://api.github.com/users/tanv33/followers?per_page=100"
  );
};
