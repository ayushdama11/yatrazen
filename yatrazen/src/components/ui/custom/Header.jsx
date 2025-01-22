import React from "react";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className="w-screen p-1 shadow-sm flex justify-between items-center px-5 bg-white">
      <img src="/yatrazen.svg" alt="YatraZen Logo" className="h-12 sm:h-16 md:h-20 rounded-xl" />
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
