import React, { ReactNode } from "react";
import { Layout as LayoutAntd } from "antd";

const { Content } = LayoutAntd;

interface LayoutProps {
  children: ReactNode;
}

const LayoutLogin: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutAntd className="min-h-screen">
      <Content className="flex flex-row h-full">
        <div className="w-1/3 p-5 first:bg-gradient-to-br from-[#00152e] to-dark_blue flex">
          <img
            src="/images/logo.jpeg"
            alt="logo"
            className="mx-auto my-auto w-[200px] rounded"
          />
        </div>
        <div className="w-2/3 p-5">{children}</div>
      </Content>
    </LayoutAntd>
  );
};

export default LayoutLogin;
