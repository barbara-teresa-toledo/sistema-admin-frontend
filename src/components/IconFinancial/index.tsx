import React from "react";
import { FallOutlined, RiseOutlined } from "@ant-design/icons";

interface IconFinancialProps {
  type: number;
}

const IconFinancialProps: React.FC<IconFinancialProps> = ({ type }) =>
  type == 0 ? (
    <div
      className={`flex justify-center p-3 w-10 rounded-full text-green-800 border-green-800 bg-green-100`}
    >
      <RiseOutlined />
    </div>
  ) : (
    <div
      className={`flex justify-center p-3 w-10 rounded-full text-red-800 border-red-800 bg-red-100`}
    >
      <FallOutlined />
    </div>
  );

export default IconFinancialProps;
