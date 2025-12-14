import React from "react";
import { DiFirebase, DiReact, DiZend } from "react-icons/di";
import {
  Section,
  SectionDivider,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  List,
  ListContainer,
  ListItem,
  ListParagraph,
  ListTitle,
  TechnologiesContainer,
} from "./TechnologiesStyles";

const Technologies = () => (
  <Section id="tech">
    <SectionDivider divider />
    <SectionTitle>Technologies</SectionTitle>
    <SectionText>
      Backend-focused fullstack engineer specializing in scalable server-side systems and distributed architectures.
    </SectionText>
    <TechnologiesContainer>
      <List>
        <ListItem>
          <picture>
            <DiFirebase size="3rem" />
          </picture>
          <ListContainer>
            <ListTitle>Backend</ListTitle>
            <ListParagraph>
              Node.js, NestJS, ExpressJS<br />
              GraphQL, REST, Socket.io<br />
              Stripe Integration, BullMQ<br />
              Microservices
            </ListParagraph>
          </ListContainer>
        </ListItem>
        <ListItem>
          <picture>
            <DiReact size="3rem" />
          </picture>
          <ListContainer>
            <ListTitle>Frontend</ListTitle>
            <ListParagraph>
              React, Next.js, Tailwind CSS<br />
              Zustand, UI Component Design<br />
              HTML5, CSS3, JavaScript
            </ListParagraph>
          </ListContainer>
        </ListItem>
        <ListItem>
          <picture>
            <DiFirebase size="3rem" />
          </picture>
          <ListContainer>
            <ListTitle>Database</ListTitle>
            <ListParagraph>
              PostgreSQL, MongoDB<br />
              Redis (Caching)<br />
              Optimization & Indexing
            </ListParagraph>
          </ListContainer>
        </ListItem>
        <ListItem>
          <picture>
            <DiZend size="3rem" />
          </picture>
          <ListContainer>
            <ListTitle>Cloud & DevOps</ListTitle>
            <ListParagraph>
              Google Cloud (GCP), Cloud Run<br />
              Docker, GitHub Actions CI/CD<br />
              Cloud Storage, Secrets Mgmt<br />
              Git, API Gateway
            </ListParagraph>
          </ListContainer>
        </ListItem>
      </List>
    </TechnologiesContainer>
    <SectionDivider colorAlt />
  </Section>
);

export default Technologies;
