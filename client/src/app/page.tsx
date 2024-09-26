import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Home() {
  return (
    <div className="bg-image flex items-center justify-center w-full h-screen flex-col px-4">
      <TextGenerateEffect className="bg-clip-text  text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-5xl md:text-4xl lg:text-7xl font-sans font-bold tracking-tight"
      words="Welcome to," />  
      <TextGenerateEffect className="bg-clip-text  text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white -mt-4 text-5xl md:text-4xl lg:text-7xl font-sans  font-bold tracking-tight"
      words="Hellogram" />  
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        A telegram clone build by Dhirendra Singh
      </p>
      <div className="p-4 ">
        <Link href="/home" >
        <Button className="w-full px-6 bg-[#0088CC] py-4 font-bold  hover:bg-[#179CDE] ">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
