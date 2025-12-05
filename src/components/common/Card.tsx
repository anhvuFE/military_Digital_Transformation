import { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";

interface Props {
  title?: ReactNode;
  extra?: ReactNode;
  className?: string;
}

function Card({ title, extra, className, children }: PropsWithChildren<Props>) {
  return (
    <div className={clsx("card", className)}>
      {(title || extra) && (
        <div className="section-header" style={{ marginBottom: 10 }}>
          {title && <h3 style={{ margin: 0 }}>{title}</h3>}
          {extra}
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;
