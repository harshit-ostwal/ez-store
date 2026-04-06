import {
  Box,
  Equal,
  Heart,
  Loader2,
  LogOut,
  MapPinCheckInside,
  ShoppingBag,
  Trash2,
  User2,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Sitemap } from "@/constants/site-map";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useProduct } from "@/providers/ProductProvider";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Heading } from "../ui/Headings";
import { ImageComp } from "../ui/image";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ProductButton from "./ProductButton";

function Navbar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loggedInUser, signOut } = useAuth();
  const location = useLocation();
  const {
    carts,
    whishlist,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartSummary,
    findProductInCart,
    open,
    setOpen,
    clearCart,
  } = useProduct();

  const { totalItems, totalPrice, totalDiscount, totalPriceAfterDiscount } =
    cartSummary;

  return (
    <nav className="flex items-center gap-3 w-full">
      <Sheet>
        <SheetTrigger className="lg:hidden">
          <Equal size={32} />
        </SheetTrigger>
        <SheetContent showCloseButton>
          <SheetHeader>
            <SheetTitle asChild>
              <Heading
                size="h4"
                className={"font-bold inline-flex items-center"}
              >
                <ShoppingBag className="text-amber-500 stroke-3 mr-2" /> EzStore
              </Heading>
            </SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-10 items-center justify-center-safe py-20">
            {Sitemap.map((item, idx) => (
              <SheetClose asChild key={idx}>
                <Link key={idx} to={item.path}>
                  <Heading
                    size="h6"
                    className={cn(
                      location.pathname === item.path
                        ? "text-foreground"
                        : "text-muted-foreground",
                      "transition-colors duration-300 hover:text-foreground font-medium",
                    )}
                  >
                    {item.name}
                  </Heading>
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <Link to="/" className="flex-1 flex justify-start">
        <Heading size="h4" className={"font-bold inline-flex items-center"}>
          <ShoppingBag className="text-amber-500 stroke-3 mr-2" /> EzStore
        </Heading>
      </Link>
      <div className="flex-1 gap-14 items-center justify-center lg:flex hidden">
        {Sitemap.map((item, idx) => (
          <Link key={idx} to={item.path}>
            <Heading
              size="p"
              className={cn(
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground",
                "transition-colors duration-300 hover:text-foreground font-medium",
              )}
            >
              {item.name}
            </Heading>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-6 flex-1 justify-end">
        <Button
          onClick={() => navigate("/my/whishlist")}
          size="icon"
          variant="none"
          className={"relative"}
        >
          <Heart />
          <Heading
            size="small"
            className="absolute -top-3 -right-3 border rounded-full w-6 h-6 flex items-center justify-center text-foreground bg-pink-200"
          >
            {whishlist.length}
          </Heading>
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="none" className={"relative"}>
              <ShoppingBag />
              <Heading
                size="small"
                className="absolute -top-3 -right-3 border rounded-full w-6 h-6 flex items-center justify-center text-foreground bg-yellow-200"
              >
                {carts.length}
              </Heading>
            </Button>
          </SheetTrigger>
          <SheetContent showCloseButton className="flex flex-col gap-4 max-w-md">
            <SheetHeader>
              <SheetTitle asChild>
                <Heading
                  size="h5"
                  className={"font-bold inline-flex items-center gap-2"}
                >
                  <ShoppingBag className="text-amber-500 stroke-3" /> Your Cart
                </Heading>
              </SheetTitle>
              <SheetDescription asChild>
                {carts.length > 0 ? (
                  <Heading size="h6" className="text-muted-foreground">
                    You have {totalItems} {totalItems > 1 ? "items" : "item"} in
                    your cart.
                  </Heading>
                ) : (
                  <Heading size="h6" className="text-muted-foreground">
                    Your cart is empty. Start adding products you like.
                  </Heading>
                )}
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className={"w-full flex-1 min-h-0"}>
              {carts.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 h-full">
                  <ShoppingBag size={42} className="text-pink-400" />
                  <div className="flex flex-col gap-1 items-center">
                    <Heading size="h5" className="font-medium">
                      Your wishlist is empty
                    </Heading>
                    <Heading size="p">
                      Start adding products you love to your wishlist.
                    </Heading>
                  </div>
                  <Link
                    to="/products"
                    onClick={() => {
                      navigate("/products");
                      setOpen(false);
                    }}
                  >
                    <Button variant="default">Shop Now</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4 px-6">
                  {carts.map((item, idx) => {
                    const productCart = findProductInCart(item);
                    const discountPrice = (
                      item.price -
                      (item.price * item.discountPercentage) / 100
                    ).toFixed(2);
                    return (
                      <div
                        key={idx}
                        className="flex flex-col gap-4 border border-border rounded-4xl p-4"
                      >
                        <div className="flex items-center gap-2">
                          <ImageComp
                            src={item.images[0]}
                            alt={item.id}
                            className={"h-18 w-18 rounded-4xl bg-muted"}
                          />
                          <div className="flex flex-col gap-1">
                            <Heading
                              size="p"
                              className={
                                "text-foreground font-medium line-clamp-1"
                              }
                            >
                              {item.title}
                            </Heading>
                            <div className="flex items-center gap-2">
                              <Heading
                                size="p"
                                className="text-primary font-semibold line-clamp-1"
                              >
                                ${(discountPrice * item.quantity).toFixed(2)}
                              </Heading>
                              <Heading
                                size="p"
                                className="text-muted-foreground line-through line-clamp-1"
                              >
                                ${(item.price * item.quantity).toFixed(2)}
                              </Heading>
                              <Badge variant="warning">
                                -{item.discountPercentage}%
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ProductButton
                            productCart={productCart}
                            increaseQuantity={() => increaseQuantity(item)}
                            decreaseQuantity={() => decreaseQuantity(item)}
                          />
                          <Button
                            onClick={() => removeFromCart(productCart)}
                            variant="destructive"
                            className={"flex-1"}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>

            <Separator />

            <SheetFooter className={"flex flex-col gap-4 pb-6"}>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Heading size="p" className="text-muted-foreground">
                    Subtotal ({totalItems} {totalItems > 1 ? "items" : "item"})
                  </Heading>
                  <Heading size="p" className="text-muted-foreground">
                    ${totalPrice}
                  </Heading>
                </div>
                <div className="flex items-center justify-between">
                  <Heading size="p" className="text-muted-foreground">
                    Discount
                  </Heading>
                  <Heading size="p" className="text-green-600">
                    - ${totalDiscount}
                  </Heading>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <Heading size="h6" className="font-semibold">
                    Total
                  </Heading>
                  <Heading size="h6" className="text-primary font-semibold">
                    ${totalPriceAfterDiscount}
                  </Heading>
                </div>
              </div>
              <Button
                disabled={carts.length === 0}
                onClick={() => {
                  clearCart();
                  setOpen(false);
                }}
                variant="default"
              >
                Proceed to Checkout
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="none" variant={"none"}>
              <Heading
                className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground text-background font-medium"
                size="p"
              >
                {loggedInUser.fullName[0].toUpperCase()}
              </Heading>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/my/profile")}>
                <User2 /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/my/profile")}>
                <Box /> Orders
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/my/profile")}>
                <MapPinCheckInside /> Addresses
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    signOut();
                    setLoading(false);
                  }, 1000);
                }}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <LogOut /> Sign Out
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navbar;
