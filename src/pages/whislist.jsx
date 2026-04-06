import ProductCard from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Headings";
import { useProduct } from "@/providers/ProductProvider";
import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router";

function Whishlist() {
  const { whishlist } = useProduct();
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <Heading size="h4" className={"font-semibold"}>
          My Wishlist
        </Heading>
        <Heading size="h6" className={"text-muted-foreground"}>
          Here are the products you have added to your wishlist. You can view
          and manage your wishlist items here.
        </Heading>
        <Heading size="h6" className={"text-muted-foreground"}>
          <span className="text-foreground font-bold">{whishlist.length}</span>{" "}
          {whishlist.length > 1 ? "items" : "item"} in your wishlist
        </Heading>
      </div>
      {whishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-40">
          <Heart size={42} className="text-pink-400" />
          <div className="flex flex-col gap-1 items-center">
            <Heading size="h5" className="font-medium">
              Your wishlist is empty
            </Heading>
            <Heading size="p">
              Start adding products you love to your wishlist.
            </Heading>
          </div>
          <Link to="/products">
            <Button variant="default">Shop Now</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-14">
          {whishlist.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Whishlist;
