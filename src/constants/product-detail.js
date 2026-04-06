import {
    Barcode,
    Boxes,
    PackageMinus,
    RotateCcw,
    Ruler,
    ShieldCheck,
    Truck,
    WeightTilde,
} from "lucide-react";

export const ProductDetailInfo = (product) => [
    {
        label: "SKU",
        value: product.sku,
        icon: Barcode,
    },
    {
        label: "Stock",
        value: product.stock,
        icon: Boxes,
    },
    {
        label: "Weight",
        value: `${product.weight} kg`,
        icon: WeightTilde,
    },
    {
        label: "Minimum Order Quantity",
        value: product.minimumOrderQuantity,
        icon: PackageMinus,
    },
    {
        label: "Shipping Information",
        value: product.shippingInformation,
        icon: Truck,
    },
    {
        label: "Return Policy",
        value: product.returnPolicy,
        icon: RotateCcw,
    },
    {
        label: "Warranty Information",
        value: product.warrantyInformation,
        icon: ShieldCheck,
    },
    {
        label: "Dimensions",
        value: `W: ${product.dimensions.width} cm · H: ${product.dimensions.height} cm · D: ${product.dimensions.depth} cm`,
        icon: Ruler,
    },
];
