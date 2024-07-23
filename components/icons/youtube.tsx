import { SVGProps } from "react";
const Youtube = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M8.163 2.667c.356.002 1.246.01 2.193.048l.336.015c.953.045 1.905.122 2.377.253.63.178 1.125.694 1.292 1.348.267 1.04.3 3.068.304 3.56l.001.101v.116c-.005.491-.038 2.52-.305 3.56a1.874 1.874 0 0 1-1.292 1.347c-.472.132-1.424.21-2.377.254l-.336.015c-.947.037-1.837.047-2.193.048h-.327c-.753-.004-3.904-.038-4.907-.317a1.875 1.875 0 0 1-1.292-1.348c-.266-1.04-.3-3.068-.304-3.559v-.217c.004-.492.038-2.52.304-3.56A1.872 1.872 0 0 1 2.93 2.984c1.002-.28 4.153-.313 4.907-.317h.326Zm-1.497 3v4.666l4-2.333-4-2.333Z"
    />
  </svg>
);
export default Youtube;