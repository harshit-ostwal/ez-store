import React from "react";
import { Link, useLoaderData } from "react-router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/Headings";
import CategoriesData from "@/constants/categories";

const categoryMeta = Object.fromEntries(
    CategoriesData.map((c) => [c.slug, { icon: c.icon, color: c.color }])
);

function Categories() {
    const { categories } = useLoaderData();

    return (
        <div className="flex flex-col gap-10 pb-20">
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
                            <BreadcrumbPage>Categories</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Heading size="h4" className="font-semibold">
                    All Categories
                </Heading>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-14">
                {categories.map((category) => {
                    const meta = categoryMeta[category.slug];
                    if (!meta) return null;
                    const Icon = meta.icon;
                    return (
                        <Link
                            key={category.slug}
                            to={`/products/category/${category.slug}`}
                            className="flex flex-col items-center gap-3 group cursor-pointer"
                            style={{ "--hover-color": meta.color }}
                        >
                            <span
                                className="p-6 rounded-full group-hover:-translate-y-1 duration-300 transition-transform"
                                style={{ backgroundColor: `${meta.color}15` }}
                            >
                                <Icon size={32} color={meta.color} />
                            </span>
                            <Heading
                                size="h6"
                                className="font-medium text-center text-ellipsis line-clamp-2 transition-all duration-300 group-hover:text-(--hover-color) group-hover:-translate-y-0.5"
                            >
                                {category.name}
                            </Heading>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Categories;
