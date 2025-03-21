import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function TypographyH1({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyH2({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl font-medium tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyH3({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyH4({ className, ...props }: ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function TypographyP({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  );
}
