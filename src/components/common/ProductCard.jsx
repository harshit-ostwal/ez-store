import { Heart, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { useProduct } from "@/providers/ProductProvider";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heading } from "../ui/Headings";
import { ImageComp } from "../ui/image";
import ProductButton from "./ProductButton";

function ProductCard({ product }) {
    const {
        id,
        title,
        images,
        price,
        discountPercentage,
        rating,
        description,
        availabilityStatus,
        category,
        reviews,
    } = product;

    const discountPrice = (price - (price * discountPercentage) / 100).toFixed(
        2
    );

    const {
        addToCart,
        findProductInWhishlist,
        findProductInCart,
        increaseQuantity,
        decreaseQuantity,
        toggleWhishlist,
        setOpen,
    } = useProduct();
    const whishlistProduct = findProductInWhishlist(product);
    const productCart = findProductInCart(product);

    return (
        <div className="flex select-none flex-col group gap-4 rounded-4xl hover:-translate-y-4 focus:-translate-y-4 duration-300">
            <Link to={`/products/${id}`} className="flex flex-col gap-4">
                <div className="relative aspect-5/4 overflow-hidden rounded-4xl">
                    <ImageComp
                        src={
                            images[0] ??
                            "https://images.unsplash.com/photo-1615397349754-cfa2066a298e"
                        }
                        alt={id}
                        className={
                            "group-hover:scale-105 duration-300 h-full w-full bg-muted object-contain"
                        }
                    />
                    <div className="flex flex-col h-full justify-between gap-1 absolute inset-0 p-4">
                        <div className="flex items-center justify-between w-full">
                            <Badge variant="outline">
                                {category
                                    .split(" ")
                                    .map(
                                        (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                    )
                                    .join(" ")}
                            </Badge>
                            <Badge
                                variant={
                                    availabilityStatus === "In Stock"
                                        ? "success"
                                        : availabilityStatus === "Out of Stock"
                                          ? "destructive"
                                          : "warning"
                                }
                            >
                                {availabilityStatus
                                    .split(" ")
                                    .map(
                                        (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                    )
                                    .join(" ")}
                            </Badge>
                        </div>
                        {availabilityStatus === "Low Stock" && (
                            <Badge variant="info">
                                Hurry, Only a Few Left in Stock!
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                                <Star
                                    key={idx}
                                    className={cn(
                                        rating > idx
                                            ? "fill-yellow-500 stroke-yellow-500"
                                            : "fill-muted stroke-muted-foreground/30"
                                    )}
                                />
                            ))}
                        </div>
                        <Heading size="p" className={"text-muted-foreground"}>
                            ({reviews.length})
                        </Heading>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Heading
                            className={"font-medium line-clamp-1"}
                            size="h6"
                        >
                            {title}
                        </Heading>
                        <Heading className={"line-clamp-2"} size="p">
                            {description}
                        </Heading>
                    </div>
                    <div className="flex items-center gap-4">
                        <Heading
                            size="h6"
                            className="text-primary font-semibold"
                        >
                            ${discountPrice}
                        </Heading>
                        <Heading
                            size="h6"
                            className="text-muted-foreground line-through"
                        >
                            ${price}
                        </Heading>
                        <Badge variant="warning">
                            -{product.discountPercentage}%
                        </Badge>
                    </div>
                </div>
            </Link>

            <div className="flex items-center gap-1">
                {availabilityStatus === "Out of Stock" ? (
                    <Badge
                        variant="destructive"
                        className={"flex-1 h-12 rounded-2xl"}
                    >
                        Sorry, Product is Out of Stock
                    </Badge>
                ) : (
                    <>
                        {!productCart ? (
                            <>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => addToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                                <Button variant="default" className="flex-1">
                                    Buy Now
                                </Button>
                            </>
                        ) : (
                            <>
                                <ProductButton
                                    productCart={productCart}
                                    increaseQuantity={() =>
                                        increaseQuantity(product)
                                    }
                                    decreaseQuantity={() =>
                                        decreaseQuantity(product)
                                    }
                                />
                                <Button
                                    variant="default"
                                    onClick={() => setOpen(true)}
                                >
                                    Go to Cart
                                </Button>
                            </>
                        )}
                    </>
                )}
                <Button
                    onClick={() => toggleWhishlist(product)}
                    variant="whishlist"
                    className={cn(whishlistProduct && "border-pink-500")}
                    size="icon-lg"
                >
                    <Heart
                        className={cn(
                            whishlistProduct && "fill-pink-400 stroke-pink-500",
                            "group-hover/btn:fill-pink-400 group-hover/btn:stroke-pink-500"
                        )}
                    />
                </Button>
            </div>
        </div>
    );
}

export default ProductCard;
