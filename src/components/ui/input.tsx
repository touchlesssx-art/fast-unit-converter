import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
  type={type}
  value={props.value === 0 ? "" : props.value}
  placeholder={props.placeholder || "0"}
  onChange={(e) =>
    props.onChange?.({
      ...e,
      target: { ...e.target, value: e.target.value === "" ? 0 : e.target.value },
    })
  }
  className={cn(

        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
