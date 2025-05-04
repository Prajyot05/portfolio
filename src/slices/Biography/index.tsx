import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/bounded";
import Heading from "@/components/heading";
import Button from "@/components/button";
import Avatar from "@/components/avatar";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography: FC<BiographyProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex gap-20">
        <div className="flex flex-col items-center gap-10">
          <Heading size="xl">{slice.primary.heading}</Heading>

          <div className="w-1/2 md:hidden">
            <Avatar image={slice.primary.avatar} className="" />
          </div>

          <div className="text-lg">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <Button
            linkField={slice.primary.button_link}
            label={slice.primary.button_text}
            className="mt-10"
          />
        </div>

        <div className="w-full hidden md:block my-auto">
          <Avatar
            image={slice.primary.avatar}
            className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
          />
        </div>
      </div>
    </Bounded>
  );
};

export default Biography;
