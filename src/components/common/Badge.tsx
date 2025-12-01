import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Badge({ children }: Props) {
  return <span className="badge">{children}</span>;
}

export default Badge;
