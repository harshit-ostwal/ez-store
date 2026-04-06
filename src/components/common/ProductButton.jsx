import React from "react";
import { Button } from "../ui/button";
import { Heading } from "../ui/Headings";

function ProductButton({ productCart, increaseQuantity, decreaseQuantity }) {
  return (
    <div className="flex items-center text-center gap-8">
      <Button onClick={decreaseQuantity} variant="outline" className={"flex-1"}>
        - 1
      </Button>
      <Heading size="h6" className="font-semibold flex-1">
        {productCart.quantity}
      </Heading>
      <Button onClick={increaseQuantity} variant="outline" className={"flex-1"}>
        + 1
      </Button>
    </div>
  );
}

export default ProductButton;
