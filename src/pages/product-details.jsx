import Autoplay from "embla-carousel-autoplay";
import { Heart, Star } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { Link, useLoaderData } from "react-router";
import ProductSection from "@/components/app/ProductSection";
import Trust from "@/components/app/Trust";
import ProductButton from "@/components/common/ProductButton";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Heading } from "@/components/ui/Headings";
import { ImageComp } from "@/components/ui/image";
import { Separator } from "@/components/ui/separator";
import { ProductDetailInfo } from "@/constants/product-detail";
import { cn } from "@/lib/utils";
import { useProduct } from "@/providers/ProductProvider";

function ProductDetails() {
    const { product, limitedProducts } = useLoaderData();

    const {
        title,
        price,
        discountPercentage,
        rating,
        description,
        availabilityStatus,
        category,
        reviews,
        tags,
        images,
        stock,
    } = product;

    const {
        addToCart,
        findProductInWhishlist,
        findProductInCart,
        increaseQuantity,
        decreaseQuantity,
        toggleWhishlist,
    } = useProduct();
    const whishlistProduct = findProductInWhishlist(product);
    const productCart = findProductInCart(product);

    const autoplayPlugin = useMemo(
        () =>
            Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnFocusIn: true,
                stopOnMouseEnter: true,
            }),
        []
    );

    const discountPrice = (price - (price * discountPercentage) / 100).toFixed(
        2
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="flex flex-col gap-20 min-h-screen">
            <div className="flex flex-col gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link
                                to="/"
                                className="text-muted-foreground hover:text-foreground duration-300"
                            >
                                Home
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link
                                to="/products"
                                className="text-muted-foreground hover:text-foreground duration-300"
                            >
                                Products
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="basis-1/2 w-full lg:flex hidden flex-col gap-4">
                        {images.map((image, idx) => (
                            <ImageComp
                                key={idx}
                                src={image}
                                alt={`Product Image ${idx + 1}`}
                                className={
                                    "w-full aspect-5/4 object-contain bg-muted rounded-4xl"
                                }
                            />
                        ))}
                    </div>
                    <div className="basis-1/2 w-full lg:hidden flex flex-col gap-4">
                        <Carousel
                            plugins={[autoplayPlugin]}
                            opts={{
                                loop: true,
                                align: "start",
                            }}
                        >
                            <CarouselContent>
                                {images.map((image, idx) => (
                                    <CarouselItem
                                        key={idx}
                                        className={"w-full"}
                                    >
                                        <ImageComp
                                            src={image}
                                            alt={`Product Image ${idx + 1}`}
                                            className={
                                                "w-full aspect-5/4 object-contain bg-muted rounded-4xl"
                                            }
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                    <div
                        className={cn(
                            "basis-1/2 w-full flex flex-col gap-10",
                            (images.length === 1 || images.length > 2) &&
                                "sticky top-10 self-start"
                        )}
                    >
                        <div className="flex flex-col gap-6">
                            <Badge variant="outline" className={"h-12 px-6"}>
                                {category
                                    .split(" ")
                                    .map(
                                        (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                    )
                                    .join(" ")}
                            </Badge>
                            <Heading size="h4" className={"font-semibold"}>
                                {title}
                            </Heading>

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
                                <Heading
                                    size="p"
                                    className={"text-muted-foreground"}
                                >
                                    {Math.floor(rating * 10) / 10} (
                                    {reviews.length})
                                </Heading>
                            </div>

                            <Heading
                                size="h6"
                                className={"text-muted-foreground"}
                            >
                                {description}
                            </Heading>

                            <div className="flex flex-wrap items-center gap-2">
                                {tags.map((tag, idx) => (
                                    <Badge
                                        key={idx}
                                        variant="secondary"
                                        className={"h-10 px-4"}
                                    >
                                        {tag
                                            .split(" ")
                                            .map(
                                                (word) =>
                                                    word
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    word.slice(1)
                                            )
                                            .join(" ")}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-4">
                                <Heading
                                    size="h3"
                                    className="text-primary font-semibold"
                                >
                                    ${discountPrice}
                                </Heading>
                                <Heading
                                    size="h5"
                                    className="text-muted-foreground line-through"
                                >
                                    ${price}
                                </Heading>
                                <Badge variant="warning">
                                    -{product.discountPercentage}%
                                </Badge>
                            </div>

                            <div className="flex items-center gap-4">
                                <Badge
                                    variant={
                                        availabilityStatus === "In Stock"
                                            ? "success"
                                            : availabilityStatus ===
                                                "Out of Stock"
                                              ? "destructive"
                                              : "warning"
                                    }
                                    className={"h-10 px-4"}
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
                                <Heading
                                    size="p"
                                    className={"text-muted-foreground"}
                                >
                                    {stock} units available
                                </Heading>
                            </div>

                            <div className="flex items-center gap-1">
                                {!productCart ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to Cart
                                        </Button>
                                        <Button
                                            variant="default"
                                            className="flex-1"
                                        >
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
                                        <Link to="/cart" className="flex-1">
                                            <Button
                                                variant="default"
                                                className={"w-full"}
                                            >
                                                Go to Cart
                                            </Button>
                                        </Link>
                                    </>
                                )}
                                <Button
                                    onClick={() => toggleWhishlist(product)}
                                    variant="whishlist"
                                    className={cn(
                                        whishlistProduct && "border-pink-500"
                                    )}
                                    size="icon-lg"
                                >
                                    <Heart
                                        className={cn(
                                            whishlistProduct &&
                                                "fill-pink-400 stroke-pink-500",
                                            "group-hover/btn:fill-pink-400 group-hover/btn:stroke-pink-500"
                                        )}
                                    />
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-4">
                            <Heading size="h5" className={"font-medium"}>
                                Additional Information
                            </Heading>

                            <div className="grid grid-cols-1 gap-4">
                                {ProductDetailInfo(product).map((info, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-4 border border-border p-4 rounded-4xl"
                                    >
                                        <span className="bg-muted p-2 rounded-xl">
                                            <info.icon />
                                        </span>
                                        <Heading
                                            key={idx}
                                            size="p"
                                            className={
                                                "text-foreground w-full line-clamp-2"
                                            }
                                        >
                                            {info.label} - <b>{info.value}</b>
                                        </Heading>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-20">
                <Trust isTitleHidden />
                <div className="flex flex-col gap-6">
                    <Heading size="h4" className={"font-semibold"}>
                        Customer Reviews
                    </Heading>
                    <Carousel
                        plugins={[autoplayPlugin]}
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                    >
                        <CarouselContent>
                            {reviews.map((review, idx) => (
                                <CarouselItem
                                    className="basis-1/1 md:basis-1/2 xl:basis-1/3"
                                    key={idx}
                                >
                                    <div className="flex flex-col gap-4 border border-border hover:bg-muted duration-300 p-6 rounded-4xl h-full">
                                        <div className="flex items-center justify-between">
                                            <Heading
                                                size="p"
                                                className={
                                                    "text-muted-foreground"
                                                }
                                            >
                                                {new Date(
                                                    review.date
                                                ).toLocaleDateString()}
                                            </Heading>
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: 5 }).map(
                                                    (_, idx) => (
                                                        <Star
                                                            key={idx}
                                                            className={cn(
                                                                review.rating >
                                                                    idx
                                                                    ? "fill-yellow-500 stroke-yellow-500"
                                                                    : "fill-muted stroke-muted-foreground/30"
                                                            )}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <Heading
                                                size="h5"
                                                className={"font-medium"}
                                            >
                                                {review.reviewerName}
                                            </Heading>
                                            <Heading
                                                size="p"
                                                className={
                                                    "text-muted-foreground"
                                                }
                                            >
                                                {review.reviewerEmail}
                                            </Heading>
                                        </div>
                                        <Heading
                                            size="h6"
                                            className={
                                                "text-foreground line-clamp-3"
                                            }
                                        >
                                            {review.comment}
                                        </Heading>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>

            <Separator />

            <ProductSection
                products={limitedProducts}
                title={"You Might Also Like"}
            />
        </div>
    );
}

export default ProductDetails;
