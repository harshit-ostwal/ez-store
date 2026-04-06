"use client";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function ImageComp({
    src,
    alt,
    width = 1920,
    height = 1080,
    className,
    ...props
}) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {!loaded && (
                <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
            )}
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={cn(
                    "object-cover object-center select-none w-full h-full transition-opacity duration-300",
                    loaded ? "opacity-100" : "opacity-0"
                )}
                draggable={false}
                loading="eager"
                fetchPriority="high"
                onLoad={() => setLoaded(true)}
                {...props}
            />
        </div>
    );
}

export { ImageComp };
