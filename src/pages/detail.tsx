import DetailData from "@/components/DetailData";
import Sidebar from "@/components/Sidebar";
import React from "react";

const detail = () => {
  return <Sidebar children={<DetailData />} />;
};

export default detail;
