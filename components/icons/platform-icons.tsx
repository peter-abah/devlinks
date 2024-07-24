import Facebook from "@/components/icons/facebook";
import FrontendMentor from "@/components/icons/frontend-mentor";
import Github from "@/components/icons/github";
import Linkedin from "@/components/icons/linkedin";
import Youtube from "@/components/icons/youtube";
import { Platforms } from "@/lib/types";
import { ReactNode, SVGProps } from "react";
import Codewars from "./codewars";
import DevTo from "./dev-to";
import FreeCodeCamp from "./freecodecamp";

interface IconProps extends SVGProps<SVGSVGElement> {}
export type IconComponent = (props: IconProps) => ReactNode;
const ICON_NAME_TO_COMPONENT: Record<Platforms, IconComponent> = {
  github: Github,
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
  frontend_mentor: FrontendMentor,
  "dev.to": DevTo,
  codewars: Codewars,
  freeCodeCamp: FreeCodeCamp,
};

interface Props extends SVGProps<SVGSVGElement> {
  name: keyof typeof ICON_NAME_TO_COMPONENT;
}
export default function PlatformIcon({ name, ...props }: Props) {
  const IconComponent = ICON_NAME_TO_COMPONENT[name];
  return <IconComponent {...props} />;
}
