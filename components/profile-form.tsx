"use client";

import { useStoreContext } from "@/app/dashboard/store-context";
import ImageIcon from "@/components/icons/image";
import { Button } from "@/components/ui/button";
import InputWithIcon from "@/components/ui/input-with-icon";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { updateProfile as updateProfileToDB } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import * as z from "zod";
import Floppy from "./icons/floppy";
import Spinner from "./spinner";

const isServer = typeof window === "undefined";
const MEGABYTE = 1024 * 1024;

const formSchema = z.object({
  id: z.number().optional(),
  profilePicture: isServer
    ? z.unknown().optional()
    : z
        .instanceof(FileList, { message: "Choose profile picture" })
        .optional()
        .refine((images) => (images?.item(0)?.size || 0) < MEGABYTE, {
          message: "Must be less than one megabyte.",
        }),
  first_name: z.string().min(1, { message: "Can't be empty." }),
  last_name: z.string().min(1, { message: "Can't be empty." }),
  email: z
    .string({ message: "Enter email" })
    .refine(isEmail, { message: "Enter valid email" })
    .optional()
    .nullable(),
});

export type FormSchema = z.infer<typeof formSchema>;
export type ProfileFormData = Omit<z.infer<typeof formSchema>, "profilePicture"> & {
  profile_image_path: string;
};

export default function ProfileForm() {
  const { toast } = useToast();
  const updateState = useStoreContext((state) => state.updateState);
  const serverProfile = useStoreContext((state) => state.serverProfile);
  const { profilePicture: _, ...serverProfileWithoutImage } = serverProfile || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: serverProfileWithoutImage,
  });

  const profilePicture = (watch("profilePicture") as FileList | undefined)?.item(0);
  const profilePicturePreview = profilePicture && {
    url: URL.createObjectURL(profilePicture),
    name: profilePicture.name,
  };
  const imgPreviewToUse = profilePicturePreview || serverProfile?.profilePicture;

  useEffect(() => {
    return () => {
      if (!profilePicturePreview) return;

      // revoke object urls to prevent memory leaks
      URL.revokeObjectURL(profilePicturePreview.url);
    };
  }, [profilePicturePreview]);

  const updateProfile = useStoreContext((state) => state.updateProfile);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const profilePicture = value.profilePicture
        ? (value.profilePicture as FileList).item(0) || undefined
        : undefined;

      const url = profilePicture && URL.createObjectURL(profilePicture);

      updateProfile({
        ...value,
        profilePicture: url ? { url, name: profilePicture.name } : serverProfile?.profilePicture,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  const uploadImage = async (profilePicture: FormSchema["profilePicture"]) => {
    const file = (profilePicture as FileList).item(0);
    if (!file) {
      if (!serverProfile?.profilePicture) {
        setError("profilePicture", { type: "custom", message: "Choose profile picture" });
        return { error: new Error() };
      }

      return {};
    }

    const browserClient = createClient();
    const { data: imageData, error } = await browserClient.storage
      .from("profile_images")
      .upload(nanoid(), file);

    if (error || !imageData) {
      toast({ description: "Error uploading image", variant: "destructive" });
      return { error };
    }

    return { data: imageData };
  };

  const onSubmit = async ({ profilePicture, ...data }: FormSchema) => {
    if (isSubmitting) return;

    const { data: imageData, error: imageError } = await uploadImage(profilePicture);
    if (imageError) return;

    const { data: profileData, error } = await updateProfileToDB({
      ...data,
      profile_image_path: imageData?.path || serverProfile!.profile_image_path,
    });

    if (error) {
      toast({ description: error.message, variant: "destructive" });
    }

    if (profileData) {
      updateState("serverProfile", profileData);
      toast({ description: "Your changes have been successfully saved!", icon: <Floppy /> });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white grow rounded-xl stack max-h-full">
      <div className="p-6 md:p-10 stack gap-6 grow max-h-full">
        <header className="space-y-2 shrink-0">
          <h1 className="text-2xl md:text-[32px] font-bold">Profile Details</h1>
          <p className="text-gray">Add your details to create a personal touch to your profile.</p>
        </header>

        <div className="stack gap-6 text-gray mb-6">
          <div className="w-full flex gap-4 items-center p-5 bg-gray-light justify-between">
            <Label className="text-base shrink-0">Profile Picture</Label>
            <div className="flex items-center gap-6">
              <label
                htmlFor="profile-picture"
                className="w-[193px] relative overflow-hidden shrink-0 aspect-square rounded-xl text-primary hover:opacity-60 bg-primary-lightest grid place-items-center cursor-pointer"
              >
                {imgPreviewToUse && (
                  <>
                    <Image
                      src={imgPreviewToUse.url}
                      alt={imgPreviewToUse.name}
                      fill
                      className="object-cover"
                    />
                    <span className="bg-[#000] bg-opacity-50 w-full h-full top-0 left-0 absolute z-10"></span>
                  </>
                )}
                <div
                  className={cn("stack relative z-10 gap-2 items-center", {
                    "text-white": !!imgPreviewToUse,
                  })}
                >
                  <ImageIcon />
                  <p className="font-semibold">
                    {imgPreviewToUse ? "Change Image" : "+ Upload Image"}
                  </p>
                </div>
              </label>

              <input
                type="file"
                id="profile-picture"
                className="sr-only"
                accept="image/*"
                {...register("profilePicture")}
              />
              <p
                className={cn("text-xs max-w-[215px] min-[1440px]:w-[215px]", {
                  "text-destructive": !!errors.profilePicture,
                })}
              >
                {errors.profilePicture
                  ? errors.profilePicture.message
                  : "Image must be below 1024x1024px. Use PNG or JPG format."}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-light p-5 text-gray stack gap-3">
          <div className="flex gap-4 items-center justify-between">
            <Label htmlFor="firstName" className="text-base shrink-0">
              First name*
            </Label>
            <InputWithIcon
              id="firstName"
              containerClassName="max-w-[432px] text-foreground"
              placeholder="e.g. John"
              {...register("first_name")}
              errorMessage={errors.first_name && errors.first_name.message}
            />
          </div>

          <div className="flex gap-4 items-center justify-between">
            <Label htmlFor="lastName" className="text-base shrink-0">
              Last name*
            </Label>
            <InputWithIcon
              id="lastName"
              containerClassName="max-w-[432px] text-foreground"
              placeholder="e.g. Appleseed"
              {...register("last_name")}
              errorMessage={errors.last_name && errors.last_name.message}
            />
          </div>

          <div className="flex gap-4 items-center justify-between">
            <Label htmlFor="email" className="text-base shrink-0">
              Email
            </Label>
            <InputWithIcon
              id="email"
              containerClassName="max-w-[432px] text-foreground"
              placeholder="e.g. email@example.com"
              {...register("email")}
              errorMessage={errors.email && errors.email.message}
            />
          </div>
        </div>
      </div>

      <div className="py-4 px-4 md:py-6 md:px-10 flex justify-end border-t shrink-0">
        <Button disabled={isSubmitting} type="submit" className="w-full md:w-auto flex gap-2">
          {isSubmitting && <Spinner />}
          Save
        </Button>
      </div>
    </form>
  );
}
