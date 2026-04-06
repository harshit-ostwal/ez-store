import React from "react";
import { Link, useLoaderData } from "react-router";
import ProductCard from "@/components/common/ProductCard";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Heading } from "@/components/ui/Headings";

function Products() {
    const { allProducts } = useLoaderData();

    return (
        <div className="flex flex-col gap-20">
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
                        <BreadcrumbPage>Products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Heading
                size="h2"
                className={"col-span-full text-center font-semibold"}
            >
                All Products
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-14">
                {allProducts.map((product, idx) => (
                    <ProductCard key={idx} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;
