import Autoplay from "embla-carousel-autoplay";
import React, { useMemo } from "react";
import { Link } from "react-router";
import CategoriesData from "@/constants/categories";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Heading } from "../ui/Headings";

const categoryMeta = Object.fromEntries(
    CategoriesData.map((c) => [c.slug, { icon: c.icon, color: c.color }])
);

function Categories({ categories = [] }) {
    const autoplayPlugin = useMemo(
        () =>
            Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnFocusIn: false,
                stopOnMouseEnter: false,
            }),
        []
    );

    return (
        <div className="flex flex-col gap-10">
            <Heading size="h4" className={"font-semibold"}>
                Shop by Category
            </Heading>

            <Carousel
                plugins={[autoplayPlugin]}
                opts={{
                    loop: true,
                    align: "start",
                }}
            >
                <CarouselContent>
                    {categories.map((category) => {
                        const meta = categoryMeta[category.slug];
                        if (!meta) return null;
                        const Icon = meta.icon;
                        return (
                            <CarouselItem
                                key={category.slug}
                                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 flex justify-center"
                            >
                                <Link
                                    to={`/products/category/${category.slug}`}
                                    className="flex items-center gap-3 flex-col w-fit cursor-pointer group"
                                    style={{ "--hover-color": meta.color }}
                                >
                                    <span
                                        className="p-6 rounded-full group-hover:-translate-y-1 duration-300 transition-transform"
                                        style={{
                                            backgroundColor: `${meta.color}10`,
                                        }}
                                    >
                                        <Icon size={32} color={meta.color} />
                                    </span>
                                    <Heading
                                        size="h6"
                                        className="font-medium text-ellipsis line-clamp-1 transition-all duration-300 group-hover:text-(--hover-color) group-hover:-translate-y-0.5"
                                    >
                                        {category.name}
                                    </Heading>
                                </Link>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default Categories;
