import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Headings";
import { Separator } from "@/components/ui/separator";
import { profileSections } from "@/constants/profile";
import { useAuth } from "@/providers/AuthProvider";
import { Edit, LogOut } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

function Profile() {
  const { loggedInUser, signOut } = useAuth();
  const [active, setActive] = useState(null);

  const handleSignOut = () => {
    signOut();
    navigate("/auth/sign-in", { replace: true });
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Profile Card */}
      <div className="flex flex-col items-center gap-4 rounded-4xl border bg-muted/40 p-8">
        <div className="flex size-24 items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl font-bold select-none">
          {loggedInUser.fullName[0].toUpperCase()}
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <Heading size="h4" className="font-semibold">
            {loggedInUser.fullName}
          </Heading>
          <p className="text-muted-foreground text-sm">{loggedInUser?.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Edit size={14} />
            Edit Profile
          </Button>
          <Button variant="destructive" size="sm" onClick={handleSignOut}>
            <LogOut size={14} />
            Sign Out
          </Button>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <Heading size="h5" className="font-medium">
          Quick Access
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {profileSections.map((section, idx) => (
            <Link
              key={idx}
              to={section.to}
              className={
                "flex items-center gap-4 border p-4 rounded-4xl cursor-pointer hover:bg-muted duration-300 "
              }
            >
              <span className="bg-muted p-2 rounded-xl shrink-0">
                <section.icon />
              </span>
              <div className="flex flex-col">
                <Heading size="p" className={"text-foreground font-medium"}>
                  {section.label}
                </Heading>
                <Heading size="small" className={"text-muted-foreground"}>
                  {section.description}
                </Heading>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
