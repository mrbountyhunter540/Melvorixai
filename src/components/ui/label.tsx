import * as React from "react";

import { cn } from "@/lib/utils";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<"label">
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "mb-1.5 block text-xs font-medium uppercase tracking-[0.1em] text-slate-400",
        className
      )}
      {...props}
    />
  );
});
Label.displayName = "Label";
