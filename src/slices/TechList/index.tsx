"use client";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/heading";
import { MdCircle } from "react-icons/md";
import Bounded from "@/components/bounded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import RepeatButton from "@/components/repeat-button";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList: FC<TechListProps> = ({ slice }) => {
  const component = useRef(null);

  const [startIndex, setStartIndex] = useState(0);
  const chunkSize = 4;
  const techItems = slice.primary.tech_info || [];
  const total = techItems.length;

  // Wrap-around logic for 4-item group
  const visibleItems = Array.from({ length: chunkSize }, (_, i) => {
    return techItems[(startIndex + i) % total];
  });

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: true, // pin the trigger element while active
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(400, 400)
              : gsap.utils.random(-400, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-400, -400)
              : gsap.utils.random(400, 400);
          },
          ease: "power1.inOut",
        }
      );
    }, component);

    return () => ctx.revert();
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
      className="w-screen overflow-hidden"
    >
      <Bounded as="div">
        <div className="flex gap-10">
          <Heading size="xl" as="h2">
            {slice.primary.heading}
          </Heading>
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={() =>
                setStartIndex((prev) => (prev + chunkSize) % total)
              }
            >
              <RepeatButton />
            </button>
          </div>
        </div>
      </Bounded>
      {visibleItems.map(({ tech_color, tech_name }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={tech_name || ""}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <Fragment key={index}>
              <span
                className={
                  "tech-item text-8xl font-extrabold uppercase tracking-tighter"
                }
                style={{
                  color: index === 7 && tech_color ? tech_color : "inherit",
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
