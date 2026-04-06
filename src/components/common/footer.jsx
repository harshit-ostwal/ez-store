import React from "react";
import { Heading } from "../ui/Headings";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { Separator } from "../ui/separator";
import { FooterData } from "@/constants/footer";

function Footer() {
  return (
    <footer className="w-full flex flex-col gap-10 pt-20 pb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-14">
        <div className="flex flex-col gap-4">
          <Link to="/">
            <Heading
              size="h4"
              className="font-bold inline-flex items-center gap-2"
            >
              <ShoppingBag className="text-amber-500 stroke-3" /> EzStore
            </Heading>
          </Link>
          <Heading size="p">
            Your one-stop shop for all your needs. Quality products, fast
            delivery, and exceptional customer service.
          </Heading>
          <div className="flex items-center gap-6">
            {FooterData.socialMedia.map(({ icon: Icon, to, label }) => (
              <Link to={to} key={label}>
                <Icon size={32} />
              </Link>
            ))}
          </div>
        </div>

        {FooterData.menus.map((menu, idx) => (
          <div className="flex flex-col gap-4" key={idx}>
            <Heading
              size="p"
              className={"uppercase text-foreground font-semibold"}
            >
              {menu.title}
            </Heading>
            {menu.links.map((site, idx) => (
              <Link key={idx} to={site.to} className="w-fit">
                <Heading
                  size="p"
                  className="hover:text-foreground font-medium transition-colors duration-200"
                >
                  {site.label}
                </Heading>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row items-center justify-between">
        <Heading size="p">
          &copy; {new Date().getFullYear()} EzStore. All rights reserved.
        </Heading>
        <Heading size="p">Made with ♥ for great shopping experiences.</Heading>
      </div>
    </footer>
  );
}

export default Footer;
