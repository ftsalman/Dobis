import React from "react";
import { AgentFlowHero } from "../components/AgentFlowHero";
import { TrustMarquee } from "../components/TrustMarquee";
import { ProblemStatement } from "../components/ProblemStatement";
import { Overview } from "../components/Overview";
import { FlowWalkthrough } from "../components/FlowWalkthrough";
import { SignalTicker } from "../components/SignalTicker";
import { StoriesCarousel } from "../components/StoriesCarousel";
import { Testimonials } from "../components/Testimonials";
import { Everything } from "../components/Everything";
import { Closing } from "../components/Closing";

// Hero.jsx, Showcase.jsx and Stories.jsx are the previous hero, pinned showcase and stories; swap them back in here if needed.
export const Homepage = () => {
  return (
    <>
      <AgentFlowHero />
      <TrustMarquee />
      <ProblemStatement />
      <Overview />
      <FlowWalkthrough />
      <SignalTicker />
      <StoriesCarousel />
      <Testimonials />
      <Everything />
      <Closing />
    </>
  );
};
