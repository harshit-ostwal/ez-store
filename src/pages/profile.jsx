import { Edit, LogOut, User2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Headings";
import { Separator } from "@/components/ui/separator";
import { profileSections } from "@/constants/profile";
import { useAuth } from "@/providers/AuthProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileSchema from "@/schema/my/profile";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Profile() {
  const { loggedInUser, signOut, updateProfile, deleteAccount } = useAuth();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const profileForm = useForm({
    resolver: zodResolver(ProfileSchema),
    values: {
      fullName: loggedInUser.fullName,
    },
  });

  const { setFocus } = profileForm;

  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);

  const onSubmit = async (data) => {
    setLoading(true);
    setTimeout(async () => {
      await updateProfile(data);
      profileForm.reset({ fullName: data.fullName });
      setFocus("fullName");
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <span className="flex size-24 items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl font-bold select-none">
            {loggedInUser.fullName[0].toUpperCase()}
          </span>
          <div className="flex flex-col gap-1 items-center md:items-start">
            <Heading size="h5" className="font-semibold">
              {loggedInUser.fullName}
            </Heading>
            <Heading size="p" className="text-muted-foreground">
              {loggedInUser.email}
            </Heading>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle asChild>
                  <Heading size="h6">Edit Profile</Heading>
                </DialogTitle>
                <DialogDescription asChild>
                  <Heading size="p" className={"leading-snug"}>
                    Update your profile information and preferences here. Make
                    sure to save your changes.
                  </Heading>
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={profileForm.handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <FieldGroup>
                  <Controller
                    name="fullName"
                    control={profileForm.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                        <InputGroup>
                          <InputGroupAddon>
                            <User2 />
                          </InputGroupAddon>
                          <InputGroupInput
                            id="fullName"
                            placeholder="Harshit Ostwal"
                            {...field}
                          />
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
                <Button isLoading={loading} disabled={loading} type="submit">
                  Update Profile
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            variant="destructive"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                signOut();
                setLoading(false);
              }, 1000);
            }}
          >
            <LogOut />
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

      <Separator />

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-6 border border-destructive/10 bg-destructive/5 rounded-4xl">
        <div className="flex flex-col">
          <Heading size="h6" className={"font-medium"}>
            Delete Account
          </Heading>
          <Heading size="p" className={"max-w-lg"}>
            Deleting your account is permanent and cannot be undone. All your
            data will be lost.
          </Heading>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle asChild>
                <Heading size="h6" className={"font-medium"}>
                  Are you absolutely sure?
                </Heading>
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <Heading size="p">
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data.
                </Heading>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    deleteAccount();
                    signOut();
                    setLoading(false);
                  }, 1000);
                }}
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default Profile;
