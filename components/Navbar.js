import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 text-[28px] text-center mt-8 mb-8 text-white">
      <Link href="/">My Tasks</Link>
    </div>
  );
};
export default Navbar;
