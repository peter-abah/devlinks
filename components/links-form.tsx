"use client";

import { StoreState } from "@/app/dashboard/store";
import { useStoreContext } from "@/app/dashboard/store-context";
import LinkInput from "@/components/link-input";
import { Button } from "@/components/ui/button";
import { updateLinks as updateLinksToDB } from "@/lib/supabase/actions";
import { Platforms } from "@/lib/types";
import LinksEmptyImage from "@/public/images/links-empty.png";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  links: z
    .object({
      id: z.number().optional(),
      platform: z.nativeEnum(Platforms),
      url: z
        .string()
        .min(1, { message: "Can't be empty" })
        .url({ message: "Please check the URL" }),
    })
    .array(),
  deletedLinksIDs: z.object({ id: z.number() }).array(),
});
export type FormSchema = z.infer<typeof formSchema>;
export type LinksFormData = FormSchema;

// TODO: Weird overflow at the bottom of page, increases when a new item is added
export default function LinksForm() {
  const { toast } = useToast();
  const updateLinks = useStoreContext((state) => state.updateLinks);
  const links = useStoreContext((state) => state.links);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: { links },
  });

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({ name: "links", control });
  const { fields: deletedLinksIDsFields, append: appendDeletedLinkID } = useFieldArray({
    name: "deletedLinksIDs",
    control,
  });

  useEffect(() => {
    const subscription = watch(({ links }, { name, type }) => {
      if (!links) return;
      const linksToPreview = links.filter((link) => !!link) as StoreState["links"];
      updateLinks(linksToPreview);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onRemoveLink = (index: number) => {
    const { id } = getValues("links")[index];
    if (id) {
      appendDeletedLinkID({ id });
    }
    removeLink(index);
  };

  const onSubmit = async (formData: FormSchema) => {
    if (isSubmitting) return;

    const { data: newLinks, error } = await updateLinksToDB(formData);
    if (error) {
      toast({ description: error.message });
      return;
    }

    if (newLinks) updateLinks(newLinks);
    toast({ description: "Your changes have been successfully saved!" });
  };

  const isLinksChanged = linkFields.length > 0 || deletedLinksIDsFields.length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white grow rounded-xl stack max-h-full">
      <div className="p-6 md:p-10 stack gap-6 grow max-h-full">
        <header className="space-y-2 shrink-0">
          <h1 className="text-2xl md:text-[32px] font-bold">Customize your links</h1>
          <p className="text-gray">
            Add/edit/remove links below and then share all your profiles with the world!
          </p>
        </header>

        <div className="stack gap-6 grow">
          <Button
            type="button"
            variant="outline"
            className="w-full font-semibold shrink-0"
            onClick={() => appendLink({} as any)}
          >
            + Add new link
          </Button>

          {linkFields.length > 0 ? (
            <div className="grow space-y-6 overflow-auto">
              {linkFields.map((field, index) => (
                <LinkInput
                  index={index}
                  key={field.id}
                  onRemove={() => onRemoveLink(index)}
                  register={register}
                  control={control}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}

          {deletedLinksIDsFields.map((field, index) => (
            <input type="hidden" {...register(`deletedLinksIDs.${index}`)} />
          ))}
        </div>
      </div>

      <div className="py-4 px-4 md:py-6 md:px-10 flex justify-end border-t shrink-0">
        <Button
          disabled={!isLinksChanged || isSubmitting}
          type="submit"
          className="w-full md:w-auto"
        >
          Save
        </Button>
      </div>
    </form>
  );
}

function EmptyState() {
  return (
    <div className="p-5 bg-gray-light stack justify-center items-center gap-6 md:gap-10 grow rounded-xl">
      <div className="relative h-20 md:h-40 aspect-[3/2]">
        <Image src={LinksEmptyImage} alt="" fill />
      </div>
      <div className="max-w-[488px] stack gap-6 text-center">
        <h2 className="text-2xl md:text-[32px] font-bold">Let’s get you started</h2>
        <p className="text-gray">
          Use the “Add new link” button to get started. Once you have more than one link, you can
          reorder and edit them. We’re here to help you share your profiles with everyone!
        </p>
      </div>
    </div>
  );
}
