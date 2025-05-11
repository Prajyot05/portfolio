import Spline from "@splinetool/react-spline/next";
import HeroText from "./hero-text";
import Bounded from "@/components/bounded";
import Shapes from "@/slices/Hero/shapes";

export default function Robot() {
  return (
    <div className="max-w-screen overflow-hidden">
      <Bounded>
        <div className="relative grid min-h-[70vh] grid-cols-1 md:grid-cols-2 justify-center items-center">
          <HeroText />
          <Shapes />
          <Spline
            className="hidden lg:block absolute scale-150 -right-80"
            scene="https://prod.spline.design/NGHVL-IHXv61pW60/scene.splinecode"
          />
        </div>
      </Bounded>
    </div>
  );
}
