import { FaFacebook, FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

export const FooterData = {
    menus: [
        {
            title: "Our Sitemap",
            links: [
                {
                    label: "Home",
                    to: "/",
                },
                {
                    label: "Products",
                    to: "/products",
                },
                {
                    label: "About Us",
                    to: "/about",
                },
                {
                    label: "Contact",
                    to: "/contact",
                },
            ],
        },
        {
            title: "Customer Service",
            links: [
                {
                    label: "Wishlist",
                    to: "#",
                },
                {
                    label: "My Account",
                    to: "#",
                },
                {
                    label: "Order History",
                    to: "#",
                },
                {
                    label: "Returns & Exchanges",
                    to: "#",
                },
                {
                    label: "Shipping Information",
                    to: "#",
                },
                {
                    label: "Payment Methods",
                    to: "#",
                },
            ],
        },
        {
            title: "Contact Us",
            links: [
                {
                    label: "harshitostwal1234@gmail.com",
                    to: "mailto:harshitostwal1234@gmail.com",
                },
                {
                    label: "+1 (800) 123-4567",
                    to: "tel:+18001234567",
                },
                {
                    label: "San Francisco, CA 94103",
                    to: "https://www.google.com/maps/place/San+Francisco,+CA+94103",
                },
            ],
        },
    ],
    socialMedia: [
        {
            icon: FaXTwitter,
            to: "#",
            label: "Twitter",
        },
        {
            icon: FaInstagram,
            to: "#",
            label: "Instagram",
        },
        {
            icon: FaFacebook,
            to: "#",
            label: "Facebook",
        },
        {
            icon: FaGithub,
            to: "#",
            label: "GitHub",
        },
    ],
};
