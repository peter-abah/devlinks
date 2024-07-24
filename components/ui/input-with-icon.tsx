import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /*
   * Icon is assumed to have a width of 16px
   */
  icon: ReactNode;
  errorMessage?: string;
}
const InputWithIcon = forwardRef<HTMLInputElement, Props>(
  ({ icon, errorMessage, className, ...props }, ref) => {
    return (
      <div className="relative w-full h-fit">
        {icon && (
          <span className="absolute z-10 top-1/2 -translate-y-1/2 left-4 w-fit h-fit">{icon}</span>
        )}
        <Input
          className={cn("w-full left-0 pl-11", className, { "border-destructive": !!errorMessage })}
          {...props}
          ref={ref}
        />
        {errorMessage && (
          <span className="absolute bg-white p-1 z-10 top-1/2 -translate-y-1/2 right-4 text-xs text-destructive">
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;
