import Equal from "@/components/icons/equal";
import LinkIcon from "@/components/icons/link";
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
import PlatformIcon from "./icons/platform-icons";

interface Props {
  linkNo: number;
}
export default function LinkInput({ linkNo }: Props) {
  return (
    <div className="p-5 space-y-3 bg-gray-light rounded-xl">
      <header className="flex justify-between items-center">
        <h3 className="flex gap-2 items-center">
          <Equal />
          <span className="font-bold text-gray">#Link {linkNo}</span>
        </h3>
        <button type="button" className="text-gray hover:text-primary">
          Remove
        </button>
      </header>

      <div className="space-y-1">
        <Label htmlFor={`platform-${linkNo}`}>Platform</Label>
        <Select>
          <SelectTrigger id={`platform-${linkNo}`}>
            <SelectValue placeholder={<div>Select a platform</div>} />
          </SelectTrigger>
          <SelectContent className="mt-4">
            <SelectItem value="github">
              <div className="flex gap-3 items-center">
                <PlatformIcon name="github" />
                <span>Github</span>
              </div>
            </SelectItem>
            <SelectSeparator />
            <SelectItem value="youtube">
              <div className="flex gap-3 items-center">
                <PlatformIcon name="youtube" />
                <span>Youtube</span>
              </div>
            </SelectItem>
            <SelectSeparator />
            <SelectItem value="linkedin">
              <div className="flex gap-3 items-center">
                <PlatformIcon name="linkedin" />
                <span>Linkedin</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor={`url-${linkNo}`}>Link</Label>
        <InputWithIcon
          id={`url-${linkNo}`}
          icon={<LinkIcon width={16} height={16} className="text-gray" />}
          placeholder={LINK_PLACEHOLDERS.github}
        />
      </div>
    </div>
  );
}

const LINK_PLACEHOLDERS = {
  github: "e.g. https://www.github.com/johnappleseed",
};
