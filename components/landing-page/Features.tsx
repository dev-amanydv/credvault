import React from "react";

const Features = () => {
  return (
    <section className="py-1 sm:py-5 md:py-10 lg:py-20 bg-gradient-to-b from-neutral-950/50 via-black to-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-20 flex flex-col gap-8 fade-in">
          <div className="">
            <div className="text-neutral-300/70 text-left text-3xl sm:text-4xl lg:text-5xl font-semibold">
              Features That Build Trust.
            </div>
          </div>
          <hr className="w-full border-0 h-[1px] bg-gradient-to-r from-white/0 via-white/10 to-white/0 mb-2" />
          <div className="grid grid-cols-1 flex-grow grid-flow-dense md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            <div className="col-span-1 rounded-3xl relative row-span-2 p-2 text-neutral-300 bg-neutral-600/10 overflow-hidden hover:brightness-125 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-neutral-500/10 group-hover:bg-neutral-900/30 transition-all duration-500 ease-in-out"></div>
              <div className="relative z-10 gap-5 h-full border-[1px] border-neutral-400/10 rounded-3xl p-4 flex flex-col justify-between">
                <div className="absolute inset-0 bg-neutral-950/70 -z-10  0 rounded-3xl group-hover:bg-black transition-all duration-500 ease-in-out"></div>
                <div className="space-y-2 z-20">
                  <p className="flex flex-row items-start gap-2 text-lg font-medium">
                    Instant Certificate Upload & Verification{" "}
                  </p>
                  <p className="text-sm text-neutral-400 line-clamp-10">
                  Upload scanned or digital certificates and get trusted verification results within seconds.
                  </p>
                </div>
                <div className="border-[1px]  border-neutral-500/10 group-hover:bg-neutral-600/30 transition-all duration-600 ease-in-out bg-neutral-600/10 rounded-3xl w-full h-80">

                </div>
              </div>
            </div>
            <div className="col-span-2 rounded-3xl relative row-span-1 p-2 text-neutral-300 bg-neutral-600/10 overflow-hidden hover:brightness-125 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-neutral-500/10 group-hover:bg-neutral-900/30 transition-all duration-500 ease-in-out"></div>
              <div className="relative z-10 gap-5 h-full border-[1px] border-neutral-400/10 rounded-3xl p-4 flex justify-between">
                <div className="absolute inset-0 bg-neutral-950/70 -z-10  0 rounded-3xl group-hover:bg-black transition-all duration-500 ease-in-out"></div>
                <div className="space-y-2 z-20">
                  <p className="flex flex-row items-start gap-2 text-lg font-medium">
                  Blockchain & Watermark Validation{" "}
                  </p>
                  <p className="text-sm text-neutral-400 line-clamp-10">
                  New certificates are secured with blockchain hashes and digital watermarks for tamper-proof authenticity.
                  </p>
                </div>
                <div className="border-[1px]  border-neutral-500/10 group-hover:bg-neutral-600/30 transition-all duration-600 ease-in-out bg-neutral-600/10 rounded-3xl w-full h-40">

                </div>
              </div>
            </div>
            <div className="col-span-1 rounded-3xl relative row-span-1 p-2 text-neutral-300 bg-neutral-600/10 overflow-hidden hover:brightness-125 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-neutral-500/10 group-hover:bg-neutral-900/30 transition-all duration-500 ease-in-out"></div>
              <div className="relative z-10 gap-5 h-full border-[1px] border-neutral-400/10 rounded-3xl p-4 flex flex-col justify-between">
                <div className="absolute inset-0 bg-neutral-950/70 -z-10  0 rounded-3xl group-hover:bg-black transition-all duration-500 ease-in-out"></div>
                <div className="border-[1px]  border-neutral-500/10 group-hover:bg-neutral-600/30 transition-all duration-600 ease-in-out bg-neutral-600/10 rounded-3xl w-full h-40">

                </div>
                <div className="space-y-2 z-20">
                  <p className="flex flex-row items-start gap-2 text-lg font-medium">
                  AI-Powered Forgery Detection{" "}
                  </p>
                  <p className="text-sm text-neutral-400 line-clamp-10">
                  Advanced AI detects tampered grades, altered photos, fake seals, and formatting inconsistencies reliably.
                  </p>
                </div>
                
              </div>
            </div>
            <div className="col-span-1 rounded-3xl relative row-span-1 p-2 text-neutral-300 bg-neutral-600/10 overflow-hidden hover:brightness-125 transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer group">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-neutral-500/10 group-hover:bg-neutral-900/30 transition-all duration-500 ease-in-out"></div>
              <div className="relative z-10 gap-5 h-full border-[1px] border-neutral-400/10 rounded-3xl p-4 flex flex-col justify-between">
                <div className="absolute inset-0 bg-neutral-950/70 -z-10  0 rounded-3xl group-hover:bg-black transition-all duration-500 ease-in-out"></div>
                <div className="space-y-2 z-20">
                  <p className="flex flex-row items-start gap-2 text-lg font-medium">
                  Institution Integration Module{" "}
                  </p>
                  <p className="text-sm text-neutral-400 line-clamp-10">
                  Colleges and universities can bulk-upload or sync records in real-time for seamless verification.
                  </p>
                </div>
                <div className="border-[1px]  border-neutral-500/10 group-hover:bg-neutral-600/30 transition-all duration-600 ease-in-out bg-neutral-600/10 rounded-3xl w-full h-40">

                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-3xl mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default Features;
