import React, { ReactNode } from "react";
type Props = {
  children: ReactNode;
};
export const Main: React.FC<Props> = ({ children }) => <div>{children}</div>;
