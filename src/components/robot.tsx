import Spline from "@splinetool/react-spline/next";
import HeroText from "./hero-text";
import Bounded from "@/components/bounded";
import Shapes from "@/slices/Hero/shapes";
import { Suspense } from "react";
import { KeyTextField } from "@prismicio/client";

interface HeroTextProps {
  heroText: {
    first_name: KeyTextField;
    last_name: KeyTextField;
    tagline: KeyTextField;
  };
}

export default function Robot({ heroText }: HeroTextProps) {
  return (
    <div className="max-w-screen overflow-y-visible">
      <div className="relative grid min-h-[70vh] grid-cols-1 md:grid-cols-2 justify-center items-center">
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div className="w-6 h-6 border-2 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
            </div>
          }
        >
          <HeroText heroText={heroText} />
          <Shapes />
          <Spline
            className="hidden lg:block absolute scale-150 -right-80"
            scene="https://prod.spline.design/BKPRM7v6sx8kZnDl/scene.splinecode"
          />
        </Suspense>
      </div>
    </div>
  );
}
