import React from "react";
import { Heading } from "../ui/Headings";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { Sitemap } from "@/constants/site-map";
import { cn } from "@/lib/utils";

function Footer() {
  return (
    <footer className="flex flex-col gap-10 w-full lg:items-center pt-40 lg:justify-center">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-10 lg:gap-2 w-full">
        <div className="flex flex-col flex-1 gap-2">
          <Link to="/">
            <Heading size="h4" className={"font-bold inline-flex items-center"}>
              <ShoppingBag className="text-amber-500 stroke-3 mr-2" /> EzStore
            </Heading>
          </Link>
          <Heading size="h6">Your one-stop shop for all your needs.</Heading>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 gap-8 lg:items-center lg:justify-end">
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
      </div>
      <Heading size="p" className="lg:text-center">
        Copyright &copy; {new Date().getFullYear()}. All rights reserved.
      </Heading>
    </footer>
  );
}

export default Footer;
