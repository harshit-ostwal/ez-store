import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Slot } from "radix-ui";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "group/button cursor-pointer inline-flex shrink-0 items-center justify-center rounded-2xl border border-border bg-clip-padding text-base font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/80",
                outline:
                    "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:bg-transparent dark:hover:bg-input/30",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
                ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
                destructive:
                    "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
                link: "text-primary underline-offset-4 hover:underline",
                none: "border-none",
                whishlist:
                    "hover:border-pink-500 focus:border-pink-500 aria-expanded:bg-pink-200/50",
            },
            size: {
                default:
                    "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
                xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
                lg: "h-12 gap-3 px-6 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
                none: "",
                icon: "[&_svg:not([class*='size-'])]:size-6",
                "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
                "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
                "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-5",
                "icon-xl": "[&_svg:not([class*='size-'])]:size-6",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button({
    className,
    variant,
    size = "lg",
    asChild = false,
    disabled = false,
    isLoading = false,
    children,
    type,
    ...props
}) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            type={type || "button"}
            className={cn(buttonVariants({ variant, size, className }))}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <Loader2 className={"size-5 animate-spin"} />
            ) : (
                children
            )}
        </Comp>
    );
}

export { Button, buttonVariants };
