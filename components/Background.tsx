"use client";
import React from "react";
import { BackgroundBeams } from "./ui/BackgroundBeams";


export function BackgroundBeamsDemo({children}:  Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className=" w-full h-screen rounded-md bg-neutral-950  antialiased">
       <BackgroundBeams/>
       {children}
      
     
    </div>
  );
}
