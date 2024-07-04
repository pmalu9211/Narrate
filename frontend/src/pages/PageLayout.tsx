import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const PageLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="mt-[100px]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};
