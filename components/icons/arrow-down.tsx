import { SVGProps } from "react";
const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={9}
    viewBox="0 0 14 9"
    fill="none"
    {...props}
  >
    <path stroke="currentColor" strokeWidth={2} d="m1 1 6 6 6-6" />
  </svg>
);
export default ArrowDown;
