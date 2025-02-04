import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from "@react-oauth/google";
import { useNavigation } from "react-router-dom";


function Header() {

  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(()=>{
    console.log(user);
  },[])


  return (
    <div className="w-screen p-1 shadow-sm flex justify-between items-center px-5 bg-white">
      <h1 className="h-8 sm:h-15 md:h-16 rounded-xl text-[#FF3B30] font-bold">yatrazen!!</h1>
      {/* <img src="/yatrazen.svg" alt="YatraZen Logo" className="h-12 sm:h-16 md:h-20 rounded-xl" /> */}
      <div>
        {user ? 
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full">My Trips</Button>
          
          <Popover>
            <PopoverTrigger><img src={user?.picture} className="h-[40px] w-[40px] rounded-full bg-white" alt="" /></PopoverTrigger>
            <PopoverContent>
              <h2 className="cursor-pointer" onClick={()=>{
                 googleLogout();
                 localStorage.clear();
                 window.location.reload();
              }}>Logout</h2>
            </PopoverContent>
          </Popover>


        </div> :
        <Button className='mr-2'>Sign In</Button>
        } 
      </div>
    </div>
  );
}

export default Header;
