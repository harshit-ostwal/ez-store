import React from "react";
import { Heading } from "../ui/Headings";
import { useAuth } from "@/providers/AuthProvider";

function Hero() {
  const { loggedInUser } = useAuth();

  return (
    <div className="flex flex-col">
      <Heading size="h5">Hey, Welcome back! 👋</Heading>
      <Heading size="h4" className="font-bold">
        {loggedInUser.fullName}
      </Heading>
    </div>
  );
}

export default Hero;
