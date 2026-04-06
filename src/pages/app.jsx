import Categories from "@/components/app/Categories";
import Hero from "@/components/app/Hero";
import Slider from "@/components/app/Slider";
import Trust from "@/components/app/Trust";
import React from "react";
import { useLoaderData } from "react-router";
import ProductSection from "@/components/app/ProductSection";

function App() {
  const { categories, trending, newArrivals, bestSellers } = useLoaderData();

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-10">
        <Hero />
        <Slider />
      </div>
      <Categories categories={categories} />
      <ProductSection products={trending} title={"Our Trending Products"} />
      <Trust />
      <Slider />
      <ProductSection products={newArrivals} title={"New Arrivals"} />
      <ProductSection products={bestSellers} title={"Best Sellers"} />
    </div>
  );
}

export default App;
