import Github from "@/components/icons/github";
import Youtube from "@/components/icons/youtube";
import { SVGProps } from "react";
import Linkedin from "./linkedin";

const ICON_NAME_TO_COMPONENT = {
  github: Github,
  youtube: Youtube,
  linkedin: Linkedin,
};

interface Props extends SVGProps<SVGSVGElement> {
  name: keyof typeof ICON_NAME_TO_COMPONENT;
}
export default function PlatformIcon({ name, ...props }: Props) {
  const IconComponent = ICON_NAME_TO_COMPONENT[name];
  return <IconComponent {...props} />;
}
