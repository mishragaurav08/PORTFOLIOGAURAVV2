import React, { useRef, useEffect, useState } from "react";

function AboutCarousel() {
  const trackRef = useRef(null);
  const itemsRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const update = () => {
      if (!trackRef.current || !itemsRef.current) return;
      const itemsWidth = itemsRef.current.offsetWidth;
      
      // Store the width for animation calculation
      trackRef.current.dataset.scrollDist = itemsWidth;
      
      const pxPerSecond = 120; // tweak this to change perceived speed
      const duration = Math.max(20, Math.round(itemsWidth / pxPerSecond));
      
      // Apply the duration directly to the track
      trackRef.current.style.animationDuration = `${duration}s`;
      
      setIsReady(true);
    };

    // Initial update
    update();
    
    // Update after images load
    const images = document.querySelectorAll('.skill-item img');
    let imagesLoaded = 0;
    
    const checkImagesLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        update();
        setIsReady(true);
      }
    };

    images.forEach(img => {
      if (img.complete) {
        checkImagesLoaded();
      } else {
        img.addEventListener('load', checkImagesLoaded);
        img.addEventListener('error', checkImagesLoaded); // Handle broken images too
      }
    });

    // Fallback timeout
    const t = setTimeout(() => {
      update();
      setIsReady(true);
    }, 1000);

    window.addEventListener("resize", update);
    
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", update);
      images.forEach(img => {
        img.removeEventListener('load', checkImagesLoaded);
        img.removeEventListener('error', checkImagesLoaded);
      });
    };
  }, []);

  const skills = [
    // Languages
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", alt: "C", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", alt: "C++", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", alt: "Swift", darkBg: false },
    // Frontend
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "ReactJS", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "NextJS", darkBg: false },
    { src: "https://cdn.simpleicons.org/tailwindcss/white", alt: "Tailwind CSS", darkBg: false },
    // Backend
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "NodeJS", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", alt: "ExpressJS", darkBg: false },
    // Mobile
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", alt: "Swift / SwiftUI / SPM", darkBg: false },
    { src: "https://cdn.simpleicons.org/apple/ffffff", alt: "UIKit / Apple", darkBg: false },
    // Databases
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL", darkBg: false },
    // Tools
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git", darkBg: false },
    { src: "https://cdn.simpleicons.org/github/ffffff", alt: "GitHub", darkBg: false },
    { src: "https://cdn.simpleicons.org/xcode/ffffff", alt: "Xcode", darkBg: false },
    { src: "https://cdn.simpleicons.org/vercel/ffffff", alt: "Vercel", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", alt: "VS Code", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma", darkBg: false },
    // Languages
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", alt: "C", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", alt: "C++", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", alt: "Swift", darkBg: false },
    // Frontend
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "ReactJS", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "NextJS", darkBg: false },
    { src: "https://cdn.simpleicons.org/tailwindcss/white", alt: "Tailwind CSS", darkBg: false },
    // Backend
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "NodeJS", darkBg: false },
    { src: "https://cdn.simpleicons.org/express/ffffff", alt: "ExpressJS", darkBg: false },
    // Mobile
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg", alt: "Swift / SwiftUI / SPM", darkBg: false },
    { src: "https://cdn.simpleicons.org/apple/ffffff", alt: "UIKit / Apple", darkBg: false },
    // Databases
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL", darkBg: false },
    // Tools
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git", darkBg: false },
    { src: "https://cdn.simpleicons.org/github/ffffff", alt: "GitHub", darkBg: false },
    { src: "https://cdn.simpleicons.org/xcode/ffffff", alt: "Xcode", darkBg: false },
    { src: "https://cdn.simpleicons.org/vercel/ffffff", alt: "Vercel", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", alt: "VS Code", darkBg: false },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma", darkBg: false },
  ];

  return (
    <div className="ac-carousel-wrapper" aria-hidden="false">
      <div
        className={`ac-track ${isReady ? 'ready' : ''}`}
        ref={trackRef}
        style={{ animationPlayState: isReady ? 'running' : 'paused' }}
      >
        <div className="ac-items" ref={itemsRef}>
          {skills.map((skill, index) => (
            <div key={`skill-${index}`} className={`skill-item ${skill.darkBg ? 'dark' : ''}`}>
              <img src={skill.src} alt={skill.alt} loading="lazy" />
            </div>
          ))}
        </div>
        <div className="ac-items" aria-hidden>
          {skills.map((skill, index) => (
            <div key={`skill-duplicate-${index}`} className={`skill-item ${skill.darkBg ? 'dark' : ''}`}>
              <img src={skill.src} alt={skill.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutCarousel;