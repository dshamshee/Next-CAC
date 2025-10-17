'use client'
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaEnvelope, FaPlus } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";


export const Navbar = ({ className }: { className?: string })=>{
    const [active, setActive] = useState<string | null>(null);
    const router = useRouter();

    const handleLogout = async ()=>{
        try {
            await signOut();
            toast.success("Logged out successfully")
            router.push("/login")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error.message)
            toast.error("Failed to logout")
        }
    }


    return(
        <div 
        className={cn("fixed top-10 px-5 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                {/* HOme */}
                {/* <Link href="/">
                <MenuItem setActive={setActive} active={active} item="Home">
                
                </MenuItem> 
                </Link> */}
                <HoveredLink href="/">
                <h1 className="text-lg font-bold">Next Note</h1>
                </HoveredLink>

                {/* Our Courses */}
                <Button onClick={()=> router.push("/addnote")} className="w-8 h-8 cursor-pointer hover:text-green-500 font-bold" variant="outline">
                    <FaPlus />
                </Button>

                {/* Contact Us */}
                <Button onClick={handleLogout} className="w-8 h-8 cursor-pointer hover:text-red-500 font-bold" variant="outline">
                    <LogOut className=""/>
                    {/* <p>LogOut</p> */}
                </Button>

            </Menu>
        </div>
    )
}