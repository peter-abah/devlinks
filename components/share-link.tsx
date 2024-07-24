"use client";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface Props {
  link: string;
}
export default function ShareLinkButton({ link }: Props) {
  const { toast } = useToast();

  const shareLink = () => {
    navigator.clipboard.writeText(link);
    toast({ description: "The link has been copied to your clipboard!" });
  };

  return (
    <Button type="button" onClick={shareLink}>
      Share Link
    </Button>
  );
}
