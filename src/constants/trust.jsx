import { ShieldCheck, Tag, Zap } from "lucide-react";

export const trustItems = [
  {
    icon: <Zap className="text-yellow-500 fill-yellow-500" size={32} />,
    title: "Fast Delivery",
    description: "Same-day on select items",
  },
  {
    icon: <ShieldCheck className="text-green-500" size={32} />,
    title: "Secure Payments",
    description: "100% encrypted checkout",
  },
  {
    icon: <Tag className="text-blue-500" size={32} />,
    title: "Best Prices",
    description: "Price-match guarantee",
  },
];
