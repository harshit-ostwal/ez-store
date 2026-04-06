import { ArrowDownUp, Search, SlidersHorizontal, X } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heading } from "@/components/ui/Headings";
import { Input } from "@/components/ui/input";
import { SORT_OPTIONS, STOCK_OPTIONS } from "@/constants/product-options";
import { cn } from "@/lib/utils";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../ui/input-group";

function ProductOptions({
    count,
    search,
    setSearch,
    sortBy,
    setSortBy,
    stockFilters,
    toggleStock,
    hasFilters,
    clearFilters,
}) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Heading size="h6" className={"font-semibold shrink-0"}>
                {count} {count === 1 ? "Product" : "Products"}
            </Heading>

            <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="flex items-center gap-2 w-full">
                    <InputGroup className={cn(hasFilters && "flex-1")}>
                        <InputGroupInput
                            className={"lg:min-w-md md:min-w-xs"}
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>

                    {hasFilters && (
                        <Button variant="ghost" onClick={clearFilters}>
                            <X />
                        </Button>
                    )}
                </div>

                <div className="flex items-center gap-2 w-full">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"flex-1"}>
                                <ArrowDownUp />
                                Sort
                                {sortBy !== "default" && (
                                    <span className="size-2 rounded-full bg-primary" />
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                                value={sortBy}
                                onValueChange={setSortBy}
                            >
                                {SORT_OPTIONS.map((opt) => (
                                    <DropdownMenuRadioItem
                                        key={opt.value}
                                        value={opt.value}
                                        className={cn(
                                            opt.value === sortBy &&
                                                "text-foreground font-medium"
                                        )}
                                    >
                                        {opt.label}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className={"flex-1"}>
                                <SlidersHorizontal />
                                Stock
                                {stockFilters.length > 0 && (
                                    <span className="flex size-6 text-sm items-center justify-center rounded-4xl bg-primary font-semibold text-primary-foreground">
                                        {stockFilters.length}
                                    </span>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Availability</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {STOCK_OPTIONS.map((opt) => (
                                <DropdownMenuCheckboxItem
                                    key={opt.value}
                                    checked={stockFilters.includes(opt.value)}
                                    onCheckedChange={() =>
                                        toggleStock(opt.value)
                                    }
                                    className={cn(
                                        stockFilters.includes(opt.value) &&
                                            "text-foreground font-medium"
                                    )}
                                >
                                    {opt.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}

export default ProductOptions;
