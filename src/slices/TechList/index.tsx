"use client";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/heading";
import Bounded from "@/components/bounded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RepeatButton from "@/components/repeat-button";
import { PrismicNextImage } from "@prismicio/next";

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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Wrap-around logic for 4-item group
  const visibleItems = Array.from({ length: chunkSize }, (_, i) => {
    return techItems[(startIndex + i) % total];
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  // Handler for repeat button with GSAP animate-out, update, animate-in
  const handleRepeat = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    // Animate button press with a spring-like effect
    gsap.fromTo(
      buttonRef.current,
      { scale: 1 },
      {
        scale: 0.9,
        duration: 0.1,
        ease: "power1.in",
        yoyo: true,
        repeat: 1,
      }
    );

    const rows = gsap.utils.toArray<HTMLElement>(
      ".tech-row",
      component.current
    );

    const tl = gsap.timeline({
      defaults: { ease: "power1.inOut", duration: 0.4 },
    });

    // Exit animation: current rows go down and fade out
    tl.to(rows, {
      opacity: 0,
      y: 50,
      stagger: 0.05,
      onComplete: () => {
        // Update the list after current items animate out
        setStartIndex((prev) => (prev + chunkSize) % total);

        // Wait for DOM to update
        requestAnimationFrame(() => {
          const newRows = gsap.utils.toArray<HTMLElement>(
            ".tech-row",
            component.current
          );

          // Entrance animation: new rows come from above and fade in
          gsap.fromTo(
            newRows,
            { opacity: 0, y: -50 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.4,
              ease: "power1.out",
              onComplete: () => setIsAnimating(false),
            }
          );
        });
      },
    });
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
      className="w-screen overflow-hidden"
    >
      <Bounded as="div">
        <div className="flex flex-col md:flex-row md:gap-10">
          <Heading size="xl" as="h2">
            {slice.primary.heading}
          </Heading>
          <div className="flex items-center justify-center mt-4">
            <button ref={buttonRef} onClick={handleRepeat}>
              <RepeatButton />
            </button>
          </div>
        </div>
      </Bounded>
      {visibleItems.map(({ tech_color, tech_name, tech_logo }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={tech_name || ""}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <Fragment key={index}>
              <div className="flex items-center gap-3">
                {/* Logo + name together */}
                <div className="flex mx-12 items-center gap-6 text-6xl md:text-8xl font-extrabold uppercase tracking-tighter tech-item">
                  {tech_logo && (
                    <PrismicNextImage
                      alt=""
                      field={tech_logo}
                      className="avatar-image h-20 w-20 object-contain"
                      imgixParams={{ q: 90 }}
                    />
                  )}
                  <span
                    style={{
                      color: index === 7 && tech_color ? tech_color : "inherit",
                    }}
                  >
                    {tech_name}
                  </span>
                </div>

                {/* Dot */}
                {/* <span className="text-3xl text-neutral-500">
                  <MdCircle />
                </span> */}
              </div>
            </Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
