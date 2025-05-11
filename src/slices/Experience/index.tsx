"use client";
import Bounded from "@/components/bounded";
import Heading from "@/components/heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

/**
 * Props for `Experience`.
 */
export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: ExperienceProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading as="h2" size="lg">
        {slice.primary.heading}
      </Heading>
      <VerticalTimeline>
        {slice.primary.info.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            date={item.time_period || ""}
            iconStyle={{
              background: "#1e293b", // slate-800
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            icon={
              item.logo?.url && (
                <PrismicNextLink field={item.institution_link}>
                  <PrismicNextImage
                    alt=""
                    field={item.logo}
                    className="h-12 w-12 rounded-full object-cover"
                    imgixParams={{ q: 90 }}
                  />
                </PrismicNextLink>
              )
            }
            contentStyle={{
              background: "#0f172a", // slate-900
              color: "#e2e8f0", // slate-200
              borderRadius: "0.75rem",
              padding: "1.5rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
            contentArrowStyle={{ borderRight: "7px solid #0f172a" }}
          >
            <div>
              <span className="text-md font-medium text-slate-400">
                {item.institution}
              </span>
              <Heading as="h3" size="sm" className="text-white">
                {item.title}
              </Heading>
            </div>
            <div className="mt-2 prose prose-sm prose-invert">
              <PrismicRichText field={item.description} />
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </Bounded>
  );
};

export default Experience;
