import {
  CreditCard,
  Heart,
  MapPin,
  Package,
  Settings,
  User2,
} from "lucide-react";

export const profileSections = [
  {
    label: "My Account",
    description: "Manage your personal details",
    icon: User2,
  },
  {
    label: "My Address",
    description: "Saved delivery addresses",
    icon: MapPin,
  },
  {
    label: "My Orders",
    description: "Track and manage your orders",
    icon: Package,
  },
  {
    label: "My Wishlist",
    description: "Products you have saved",
    icon: Heart,
    to: "/my/whishlist",
  },
  {
    label: "Payment Methods",
    description: "Cards and payment options",
    icon: CreditCard,
  },
  {
    label: "Settings",
    description: "App preferences and security",
    icon: Settings,
  },
];
