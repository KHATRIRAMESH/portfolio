import React from "react";

import {
  CarouselContainer,
  CarouselItem,
  CarouselItemText,
  CarouselItemTitle,
  TimelinePoint,
  TimelineLine,
} from "./TimeLineStyles";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { TimeLineData } from "../../constants/constants";

const Timeline = () => {
  return (
    <Section id="about">
      <SectionTitle>About Me</SectionTitle>
      <SectionText>
        Experienced Full Stack Backend & DevOps Engineer with over 2 years of
        experience. Passionate about delivering high-quality web solutions with
        a strong foundation in Node.js. Committed to writing clean code,
        providing exceptional user experiences, and staying updated with
        industry trends for innovative solutions.
      </SectionText>
      <CarouselContainer>
        {TimeLineData.map((item, index) => (
          <CarouselItem key={index}>
            <CarouselItemTitle>{item.year}</CarouselItemTitle>

            <TimelinePoint />
            {/* Show connecting line for all except the last item */}
            <TimelineLine active={index === TimeLineData.length - 1} />

            <CarouselItemText>{item.text}</CarouselItemText>
          </CarouselItem>
        ))}
      </CarouselContainer>
      <SectionDivider />
    </Section>
  );
};

export default Timeline;
