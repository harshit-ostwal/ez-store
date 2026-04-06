import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("text-pretty", {
    variants: {
        size: {
            h1: "text-5xl font-semibold lg:text-6xl xl:text-7xl",
            h2: "text-4xl font-semibold lg:text-5xl",
            h3: "text-3xl font-medium lg:text-4xl",
            h4: "text-2xl font-medium lg:text-3xl",
            h5: "text-xl lg:text-2xl",
            h6: "max-w-2xl text-lg lg:text-xl",
            p: "text-muted-foreground max-w-2xl text-base md:text-lg",
            ul: "list-inside list-disc space-y-4 text-[16px] font-medium",
            li: "text-[16px]",
            small: "text-sm",
        },
    },
    defaultVariants: {
        size: "h1",
    },
});

export const Heading = ({ className, size = "h1", id, children, ...props }) => {
    const Tag = size === "p" ? "p" : size;
    return (
        <Tag
            className={cn(headingVariants({ size }), "leading-snug", className)}
            id={id}
            {...props}
        >
            {children}
        </Tag>
    );
};
