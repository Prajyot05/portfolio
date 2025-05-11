"use client";
import { FC, useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/components/bounded";
import Shapes from "./shapes";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const component = useRef(null);

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

  const renderLetters = (name: KeyTextField, key: string) => {
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
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 justify-center items-center">
        <Shapes />
        <div className="flex flex-col items-center">
          <h1
            className="mb-8 text-[7rem] text-center md:text-left lg:text-[10rem] font-extrabold leading-none text-nowrap tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[0.2em] block text-slate-500">
              {renderLetters(slice.primary.last_name, "second")}
            </span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text font-bold uppercase tracking-[0.2em] text-transparent opacity-0 text-xl md:text-3xl md:text-nowrap lg:text-4xl">
            {slice.primary.tagline}
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
