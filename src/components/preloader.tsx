"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => setVisible(false), 1000);
      },
    });

    if (textRef.current?.children) {
      tl.fromTo(
        textRef.current?.children,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out", stagger: 0.2 }
      ).to(containerRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power3.inOut",
        delay: 1,
      });
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0E172B]"
    >
      <div ref={textRef} className="flex flex-wrap">
        <span className="text-white text-4xl font-bold mx-1 inline-block opacity-0">
          Powered
        </span>
        <span className="text-white text-4xl font-bold mx-1 inline-block opacity-0">
          by
        </span>
        <span className="text-[#E74C3C] text-4xl font-bold mx-1 inline-block opacity-0">
          coffee,
        </span>
        <span className="text-[#3498DB] text-4xl font-bold mx-1 inline-block opacity-0">
          curiosity,
        </span>
        <span className="text-white text-4xl font-bold mx-1 inline-block opacity-0">
          and
        </span>
        <span className="text-[#F1C40F] text-4xl font-bold mx-1 inline-block opacity-0">
          {/* downright obsession. */}
          relentless determination.
        </span>
      </div>
    </div>
  );
}
