"use client";
import Link from "./icons/link";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface Props {
  link: string;
}
export default function ShareLinkButton({ link }: Props) {
  const { toast } = useToast();

  const shareLink = () => {
    navigator.clipboard.writeText(link);
    toast({
      description: "The link has been copied to your clipboard!",
      icon: <Link color="#737373" />,
    });
  };

  return (
    <Button type="button" onClick={shareLink}>
      Share Link
    </Button>
  );
}
