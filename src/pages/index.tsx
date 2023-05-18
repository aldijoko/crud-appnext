import HomeTable from "@/components/HomeTable";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <>
      <Sidebar children={<HomeTable />} />
    </>
  );
}
