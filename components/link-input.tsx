"use client";

import Equal from "@/components/icons/equal";
import LinkIcon from "@/components/icons/link";
import PlatformIcon from "@/components/icons/platform-icons";
import { FormSchema } from "@/components/links-form";
import InputWithIcon from "@/components/ui/input-with-icon";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLATFORMS, Platforms } from "@/lib/types";
import { titleCase } from "@/lib/utils";
import { ComponentPropsWithRef, Fragment } from "react";
import { Control, Controller, UseFormRegister, useFormState, useWatch } from "react-hook-form";

interface Props extends ComponentPropsWithRef<"input"> {
  index: number;
  onRemove: () => void;
  register: UseFormRegister<FormSchema>;
  control: Control<FormSchema>;
}
export default function LinkInput({ index, onRemove, register, control }: Props) {
  const { errors } = useFormState({ control });
  const currentPlatForm =
    useWatch({
      name: `links.${index}.platform`,
      control,
    }) ?? "default";

  return (
    <div className="p-5 space-y-3 bg-gray-light rounded-xl">
      <header className="flex justify-between items-center">
        <h3 className="flex gap-2 items-center">
          <Equal />
          <span className="font-bold text-gray">#Link {index + 1}</span>
        </h3>
        <button type="button" className="text-gray hover:text-primary" onClick={onRemove}>
          Remove
        </button>
      </header>

      <div className="space-y-1">
        <Label htmlFor={`platform-${index}`}>Platform</Label>
        <Controller
          name={`links.${index}.platform`}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                id={`platform-${index}`}
                className={errors.links?.[index]?.platform && "border-destructive text-destructive"}
              >
                <SelectValue placeholder={<div>Select a platform</div>} />
              </SelectTrigger>

              <SelectContent className="mt-4">
                {PLATFORMS.map((platform, index) => (
                  <Fragment key={platform}>
                    <SelectItem value={platform}>
                      <div className="flex gap-3 items-center">
                        <PlatformIcon name={platform} />
                        <span>{titleCase(platform)}</span>
                      </div>
                    </SelectItem>
                    {index < PLATFORMS.length - 1 && <SelectSeparator />}
                  </Fragment>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor={`url-${index}`}>Link</Label>
        <InputWithIcon
          id={`url-${index}`}
          icon={<LinkIcon width={16} height={16} className="text-gray" />}
          placeholder={LINK_PLACEHOLDERS[currentPlatForm]}
          {...register(`links.${index}.url`)}
          errorMessage={errors.links?.[index]?.url && errors.links[index]?.url?.message}
        />
      </div>
    </div>
  );
}

const LINK_PLACEHOLDERS: Record<Platforms | "default", string> = {
  github: "e.g. https://www.github.com/johnappleseed",
  youtube: "e.g. https://www.youtube.com/johnappleseed",
  linkedin: "e.g https://www.linkedin.com/in/johnappleseed",
  facebook: "e.g https://www.facebook.com/johnappleseed",
  frontend_mentor: "e.g https://www.frontendmentor.io/profile/johnappleseed",
  default: "e.g https://www.example.com/johnappleseed",
};
