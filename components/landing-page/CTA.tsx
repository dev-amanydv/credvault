import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className=" flex justify-center h-full  items-center bg-gradient-to-br from-neutral-900/80 via-neutral-800/40 to-neutral-900/50 relative overflow-hidden  border-b border-neutral-900 md:border-b-0">
      <div className="h-50 md:h-96 mx-2 my-40  max-w-4xl w-full overflow-hidden rounded-3xl relative">
   {/* X Organizations Black Background with Top Glow */}
   <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000"}}
  />
  
  <div className="text-neutral-300 gap-10  relative h-full w-full flex flex-col items-center justify-center z-30">
    <h1 className="text-6xl font-bold"> Fast. Safe. Secure.
    </h1>
    <Link href={'#'}><button className="px-5 hover:from-indigo-700/90 hover:via-indigo-700/80 cursor-pointer hover:to-indigo-700/70 bg-gradient-to-tr text-neutral-300 from-indigo-700/80 via-indigo-700/70 to-indigo-700/60 py-2 rounded-xl ">Get Started!</button></Link>
  </div>
  </div>
    </section>
  );
};

export default CTA;
