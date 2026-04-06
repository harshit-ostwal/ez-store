import React, { useState } from "react";
import { Heading } from "../ui/Headings";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "../ui/button";
import {
  Box,
  Equal,
  Heart,
  Loader2,
  LogOut,
  MapPinCheckInside,
  Search,
  ShoppingBag,
  User2,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { Sitemap } from "@/constants/site-map";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useProduct } from "@/providers/ProductProvider";

function Navbar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loggedInUser, signOut } = useAuth();
  const location = useLocation();
  const { carts, whishlist } = useProduct();

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

          <div className="flex flex-col gap-10 items-center justify-center-safe h-full">
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
        <Button size="icon" variant="none">
          <Search />
        </Button>
        <Button
          onClick={() => navigate("/whishlist")}
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
        <Sheet>
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
          <SheetContent showCloseButton>
            <SheetHeader>
              <SheetTitle asChild>
                <Heading
                  size="h4"
                  className={"font-bold inline-flex items-center"}
                >
                  <ShoppingBag className="text-amber-500 stroke-3 mr-2" />{" "}
                  EzStore
                </Heading>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-10 items-center justify-center-safe h-full">
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
              <DropdownMenuItem>
                <User2 /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Box /> Orders
              </DropdownMenuItem>
              <DropdownMenuItem>
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
