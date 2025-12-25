import React from "react";
import AboutCarousel from "./AboutCarousel";
import SocialLinks from "./SocialLinks";

const SkillsAndSocialRow = () => (
  <section className="carousel-social-row" aria-label="Skills and social links">
    <div className="skills-container">
      <AboutCarousel />
    </div>
    <div className="spacer" aria-hidden />
    <div className="sociallinks-container">
      <SocialLinks />
    </div>
  </section>
);

export default SkillsAndSocialRow;


