"use client";
import { Content } from "@prismicio/client";
import { MdArrowOutward } from "react-icons/md";

import React, { useRef, useState, useEffect } from "react";
import { asImageSrc, isFilled } from "@prismicio/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type ContentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
};

export default function ContentList({
  items,
  contentType,
  fallbackItemImage,
  viewMoreText = "Read More",
}: ContentListProps) {
  const component = useRef(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  const revealRef = useRef(null);
  const [currentItem, setCurrentItem] = useState<null | number>(null);
  const [hovering, setHovering] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const urlPrefix = contentType === "Blog" ? "/blog" : "/projects";
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textWrapperRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const elements = textWrapperRefs.current;

    elements.forEach((el, index) => {
      const underline = underlineRefs.current[index];
      if (!el || !underline) return;

      const handleMouseEnter = () => {
        gsap.to(underline, {
          width: "100%",
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(underline, {
          width: "0%",
          duration: 0.4,
          ease: "power3.inOut",
        });
      };

      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup
      return () => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  useEffect(() => {
    // Animate list-items in with a stagger
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "elastic.out(1,0.3)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=70px", // How soon do you want the next item to pop up
              end: "bottom center",
              toggleActions: "play none none none",
            },
          }
        );
      });

      return () => ctx.revert();
    }, component);
  }, []);

  useEffect(() => {
    // Mouse move event listener
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
      // Calculate speed and direction
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      const ctx = gsap.context(() => {
        // Animate the image holder
        if (currentItem !== null) {
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.innerWidth - 250;

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1), // Apply rotation based on speed and direction
            ease: "back.out(2)",
            duration: 1.3,
          });
          gsap.to(revealRef.current, {
            opacity: hovering ? 1 : 0,
            visibility: "visible",
            ease: "power3.out",
            duration: 0.4,
          });
        }
        lastMousePos.current = mousePos;
        return () => ctx.revert();
      }, component);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hovering, currentItem]);

  const onMouseEnter = (index: number) => {
    setCurrentItem(index);
    if (!hovering) setHovering(true);

    itemsRef.current.forEach((item, i) => {
      if (!item) return;
      gsap.to(item, {
        opacity: i === index ? 1 : 0.3,
        scale: i === index ? 1.005 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  const onMouseLeave = () => {
    setHovering(false);
    setCurrentItem(null);

    itemsRef.current.forEach((item) => {
      if (!item) return;
      gsap.to(item, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  };

  const contentImages = items.map((item) => {
    const image = isFilled.image(item.data.hover_image)
      ? item.data.hover_image
      : fallbackItemImage;
    return asImageSrc(image, {
      fit: "clamp",
      w: 350,
      h: 220,
      exp: -10,
    });
  });

  // Preload images
  useEffect(() => {
    contentImages.forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  }, [contentImages]);

  const handleMainClick = (
    post: Content.ProjectDocument | Content.BlogPostDocument
  ) => {
    console.log("POST: ", post);
    router.push(`${urlPrefix}/${post.uid}`);
  };

  return (
    <>
      <ul
        ref={component}
        className="grid border-b border-b-slate-100"
        onMouseLeave={onMouseLeave}
      >
        {items.map((post, index) => (
          <li
            key={index}
            ref={(el: HTMLLIElement | null) => {
              itemsRef.current[index] = el;
            }}
            onMouseEnter={() => onMouseEnter(index)}
            className="list-item opacity-0"
          >
            <div
              onClick={() => handleMainClick(post)}
              className="cursor-pointer flex flex-col justify-between border-t border-t-slate-100 py-10  text-slate-200 md:flex-row "
              aria-label={post.data.title || ""}
            >
              <div className="flex flex-col">
                <span className="text-3xl font-bold">{post.data.title}</span>
                <div className="flex gap-3 text-yellow-400">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="text-lg font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {urlPrefix === "/projects" ? (
                <span
                  onClick={(e) => e.stopPropagation()}
                  ref={(el: HTMLSpanElement | null) => {
                    textWrapperRefs.current[index] = el;
                  }}
                >
                  <PrismicNextLink
                    className="relative ml-auto flex items-center gap-2 text-xl font-medium md:ml-0 cursor-pointer"
                    field={post.data.project_link}
                  >
                    {viewMoreText} <MdArrowOutward />
                    {/* Underline Element */}
                    <span
                      ref={(el: HTMLSpanElement | null) => {
                        underlineRefs.current[index] = el;
                      }}
                      className="absolute left-0 bottom-0 h-[1.5px] bg-white"
                      style={{ width: "0%", transition: "none" }}
                    ></span>
                  </PrismicNextLink>
                </span>
              ) : (
                <span
                  onClick={(e) => e.stopPropagation()}
                  ref={(el: HTMLSpanElement | null) => {
                    textWrapperRefs.current[index] = el;
                  }}
                >
                  <Link
                    className="relative ml-auto mt-3 flex items-center gap-2 text-xl font-medium md:ml-0 cursor-pointer"
                    href={`${urlPrefix}/${post.uid}`}
                  >
                    {viewMoreText} <MdArrowOutward />
                    {/* Underline Element */}
                    <span
                      ref={(el: HTMLSpanElement | null) => {
                        underlineRefs.current[index] = el;
                      }}
                      className="absolute left-0 bottom-0 h-[1.5px] bg-white"
                      style={{ width: "0%", transition: "none" }}
                    ></span>
                  </Link>
                </span>
              )}
            </div>
          </li>
        ))}

        {/* Hover element */}
        <div
          className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[220px] w-[350px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
          style={{
            backgroundImage:
              currentItem !== null ? `url(${contentImages[currentItem]})` : "",
          }}
          ref={revealRef}
        ></div>
      </ul>
    </>
  );
}
