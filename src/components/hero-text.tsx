"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const HeroText = () => {
  const firstName = "Prajyot";
  const lastName = "Tayde";
  const tagline = "Full Stack Developer";

  const component = useRef(null);

  const renderLetters = (name: string, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => {
      return (
        <span
          key={index}
          className={`name-animation name-animation-${key} inline-block opacity-0`}
        >
          {letter}
        </span>
      );
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".name-animation",
        { x: -100, opacity: 0, rotate: -10 },
        {
          delay: 0.5,
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          transformOrigin: "left top",
          stagger: {
            each: 0.1,
            // from: "random",
          },
        }
      );

      tl.fromTo(
        ".job-title",
        { y: 20, opacity: 0, scale: 1.2 },
        { y: 0, opacity: 1, duration: 1, scale: 1, ease: "elastic.out(1,0.3)" }
      );
    }, component); // Scope
    return () => ctx.revert();
  }, []);

  return (
    <div ref={component} className="flex flex-col items-center">
      <h1
        className="mb-8 text-[7rem] text-center md:text-left lg:text-[10rem] font-extrabold leading-none text-nowrap tracking-tighter"
        aria-label={`${firstName} ${lastName}`}
      >
        <span className="block text-slate-300">
          {renderLetters(firstName, "first")}
        </span>
        <span className="-mt-[0.2em] block text-slate-500">
          {renderLetters(lastName, "second")}
        </span>
      </h1>
      <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text font-bold uppercase tracking-[0.2em] text-transparent opacity-0 text-xl md:text-3xl md:text-nowrap lg:text-4xl">
        {tagline}
      </span>
    </div>
  );
};

export default HeroText;
