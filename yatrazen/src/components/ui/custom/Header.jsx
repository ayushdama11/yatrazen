import React from "react";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className="w-screen p-1 shadow-sm flex justify-between items-center px-5 bg-white">
      <h1 className="h-8 sm:h-15 md:h-16 rounded-xl text-[#FF3B30] font-bold">yatrazen!!</h1>
      {/* <img src="/yatrazen.svg" alt="YatraZen Logo" className="h-12 sm:h-16 md:h-20 rounded-xl" /> */}
      <div>
        <Button className='mr-2'>Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
