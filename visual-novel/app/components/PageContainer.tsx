import React, { FC, ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

export default PageContainer;
