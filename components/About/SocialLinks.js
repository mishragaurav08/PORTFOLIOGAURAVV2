import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faGithub,
  faInstagram,
  faFigma,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const links = [
  { href: "https://www.linkedin.com/in/gaurav-mishra-2668691b3/", icon: faLinkedinIn, label: "LinkedIn" },
  { href: "https://github.com/gauravMishra08", icon: faGithub, label: "GitHub" },
  { href: "https://www.figma.com/@gaurav08", icon: faFigma, label: "Figma" },
  { href: "mailto:gaurav84294372@gmail.com", icon: faEnvelope, label: "Email" },
  { href: "https://www.instagram.com/mishragaurav08/", icon: faInstagram, label: "Instagram" },
];

const SocialLinks = () => {
  return (
    <nav className="socials" aria-label="Social links">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.label}
        >
          <FontAwesomeIcon icon={l.icon} />
        </a>
      ))}
    </nav>
  );
};

export default SocialLinks;
