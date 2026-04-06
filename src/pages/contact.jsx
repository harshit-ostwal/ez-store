import { Heart, ShoppingCart, Star, Zap } from "lucide-react";
import React from "react";
import { useLoaderData } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Headings";
import { ImageComp } from "@/components/ui/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const capitalize = (str) =>
    str
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

function Contact() {
    const { product } = useLoaderData();

    const {
        title,
        thumbnail,
        images,
        price,
        discountPercentage,
        rating,
        description,
        availabilityStatus,
        category,
        reviews,
        tags,
        sku,
        stock,
        weight,
        minimumOrderQuantity,
        shippingInformation,
        returnPolicy,
        warrantyInformation,
    } = product;

    const discountedPrice = (
        price -
        (price * discountPercentage) / 100
    ).toFixed(2);

    return (
        <div className="flex flex-col gap-16">
            {/* Top Section */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
                {/* Images — full-size stacked vertically */}
                <div className="flex flex-1 flex-col gap-4">
                    {[thumbnail, ...images].map((img, i) => (
                        <div
                            key={i}
                            className="aspect-5/4 w-full overflow-hidden rounded-4xl bg-muted"
                        >
                            <ImageComp
                                src={img}
                                alt={`${title} ${i + 1}`}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    ))}
                </div>

                {/* Info — sticky on the right */}
                <div className="flex flex-1 flex-col gap-5 lg:sticky lg:top-6 lg:self-start">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{capitalize(category)}</Badge>
                        <Badge
                            variant={
                                availabilityStatus === "In Stock"
                                    ? "success"
                                    : availabilityStatus === "Out of Stock"
                                      ? "destructive"
                                      : "warning"
                            }
                        >
                            {capitalize(availabilityStatus)}
                        </Badge>
                    </div>

                    {/* Title */}
                    <Heading size="h3" className="font-semibold">
                        {title}
                    </Heading>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        rating > i
                                            ? "fill-yellow-500 stroke-yellow-500"
                                            : "fill-muted stroke-muted-foreground/30"
                                    )}
                                />
                            ))}
                        </div>
                        <Heading size="p" className="text-muted-foreground">
                            {rating} ({reviews.length})
                        </Heading>
                    </div>

                    {/* Description */}
                    <Heading size="p">{description}</Heading>

                    {/* Price */}
                    <div className="flex items-center gap-4">
                        <Heading
                            size="h4"
                            className="text-primary font-semibold"
                        >
                            ${discountedPrice}
                        </Heading>
                        <Heading
                            size="h6"
                            className="text-muted-foreground line-through"
                        >
                            ${price}
                        </Heading>
                        <Badge variant="warning">-{discountPercentage}%</Badge>
                    </div>

                    <Separator />

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        {[
                            { label: "SKU", value: sku },
                            { label: "Stock", value: `${stock} units` },
                            {
                                label: "Min. Order",
                                value: `${minimumOrderQuantity} units`,
                            },
                            { label: "Weight", value: `${weight} kg` },
                            { label: "Shipping", value: shippingInformation },
                            { label: "Returns", value: returnPolicy },
                            { label: "Warranty", value: warrantyInformation },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <Heading
                                    size="small"
                                    className="text-muted-foreground"
                                >
                                    {label}
                                </Heading>
                                <Heading size="small" className="font-medium">
                                    {value}
                                </Heading>
                            </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {capitalize(tag)}
                            </Badge>
                        ))}
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="lg" className="flex-1">
                            <ShoppingCart /> Add to Cart
                        </Button>
                        <Button variant="default" size="lg" className="flex-1">
                            <Zap /> Buy Now
                        </Button>
                        <Button
                            variant="outline"
                            size="icon-lg"
                            className="hover:bg-pink-200"
                        >
                            <Heart />
                        </Button>
                    </div>
                </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div className="flex flex-col gap-6">
                <Heading size="h5">Customer Reviews</Heading>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {reviews.map((review, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-3 rounded-4xl border p-6"
                        >
                            <div className="flex items-center justify-between">
                                <Heading size="h6" className="font-semibold">
                                    {review.reviewerName}
                                </Heading>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <Star
                                            key={j}
                                            size={14}
                                            className={cn(
                                                review.rating > j
                                                    ? "fill-yellow-500 stroke-yellow-500"
                                                    : "fill-muted stroke-muted-foreground/30"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            <Heading size="p">{review.comment}</Heading>
                            <Heading
                                size="small"
                                className="text-muted-foreground"
                            >
                                {new Date(review.date).toLocaleDateString()}
                            </Heading>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Contact;
