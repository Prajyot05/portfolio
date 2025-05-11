/* eslint-disable  @typescript-eslint/no-explicit-any */
import {
  ElementType,
  ReactNode,
  forwardRef,
  ComponentPropsWithoutRef,
  Ref,
} from "react";
import clsx from "clsx";

type BoundedOwnProps<C extends ElementType> = {
  as?: C;
  className?: string;
};

type BoundedProps<C extends ElementType> = BoundedOwnProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof BoundedOwnProps<C>> & {
    children?: ReactNode;
  };

const Bounded = <C extends ElementType = "section">(
  props: BoundedProps<C> & { ref?: Ref<any> }
) => {
  const { as: Comp = "section", className, children, ...restProps } = props;
  return (
    <Comp
      className={clsx("px-4 py-10 md:px-10 md:py-14 lg:py-16", className)}
      {...(restProps as any)}
    >
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </Comp>
  );
};

const ForwardedBounded = forwardRef(Bounded);
ForwardedBounded.displayName = "Bounded";

export default ForwardedBounded;
