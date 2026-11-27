import React from "react";
import { HomeHero } from "../components/HomeHero";
import { TrustMarquee } from "../components/TrustMarquee";
import { ProblemStatement } from "../components/ProblemStatement";
import { Overview } from "../components/Overview";
import { FlowWalkthrough } from "../components/FlowWalkthrough";
import { AgentFlow } from "../components/AgentFlow";
import { Industries } from "../components/Industries";
import { Services } from "../components/Services";
import { StoriesCarousel } from "../components/StoriesCarousel";
import { Testimonials } from "../components/Testimonials";
import { Everything } from "../components/Everything";
import { HomeFaq } from "../components/HomeFaq";
import { Closing } from "../components/Closing";

/**
 * The page answers, in order: what is doBis and who is it for (hero), can I trust it (logos),
 * why would I need it (problem), what exactly do I get (apps, how they connect, agents),
 * does it fit my business (industries), who helps me set it up (services), proof (stories),
 * the platform details, remaining doubts (FAQ), and finally what to do next.
 * SignalTicker.jsx, Hero.jsx, Showcase.jsx and Stories.jsx are unused alternatives.
 */
export const Homepage = () => {
  return (
    <>
      <HomeHero />
      <TrustMarquee />
      <ProblemStatement />
      <Overview />
      <FlowWalkthrough />
      <AgentFlow />
      <Industries />
      <Services />
      <StoriesCarousel />
      <Testimonials />
      <Everything />
      <HomeFaq />
      <Closing />
    </>
  );
};
