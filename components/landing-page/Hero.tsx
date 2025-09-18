import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="pt-28 md:pt-40 bg-gradient-to-b from-black/0 to-neutral-950 relative overflow-hidden pb-[530px] min-[480px]:pb-[560px] md:pb-[660px]  border-b border-neutral-900 md:border-b-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
        <div className="max-w-2xl space-y-6">
          <h1
            className="text-2xl sm:text-4xl lg:text-6xl leading-tight tracking-tight font-medium sm:font-regular"
            style={{
              opacity: 1,
              animation: "1s ease 0s 1 normal forwards running blurDown",
            }}
          >
            Verify Academic Credentials Instantly.
            <br /> Trust Every Certificate.
          </h1>
          <p
            className="text-base font-light sm:text-lg text-neutral-300 animate-fade-in-down animation-delay-200"
            style={{
              opacity: 1,
              animation: "1s ease 0.1s 1 normal forwards running blurDown",
            }}
          >
            Combat fake degrees and forged certificates with a smart,
            AI-powered, and secure verification platform. Ensure authenticity,
            protect student achievements, and uphold institutional integrity
            across Jharkhand.
          </p>
          <p
            className="text-neutral-500 font-light max-w-xl text-sm"
            style={{
              opacity: 1,
              animation: "1s ease 0.2s 1 normal forwards running blurDown",
            }}
          >
            {" "}
            <span className="font-medium">
            Your data is completely safe with us — protected by blockchain, making it tamper-proof and verifiable. With end-to-end encryption and immutable records, your information remains private, secure, and trusted.
            </span>
          </p>
          <div className="flex gap-4 pointer-events-auto">
            <Link
              href="/verify"
              title="Become a Supporter"
              className="bg-neutral-800/60 hover:bg-neutral-500/30 px-4 py-2 rounded-xl transition-all duration-500 ease-in-out shine-large text-sm justify-center shadow-strong text-white flex items-center animate-fade-in-up animation-delay-400 backdrop-blur-sm w-fit"
              style={{
                opacity: 1,
                animation: "blurDown 1s ease 0.3s 1 normal forwards running",
              }}
            >
              Verify A Certificate
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right ml-2"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </Link>
            <div className="relative">
               <Link href={'/upload'}>
               <button
                className="text-sm text-neutral-400 nofocus bg-black/50 sm:bg-black/0 shadow-strong backdrop-blur-sm shine-large hover:bg-black/50 transition-all duration-500 ease-in-out rounded-xl"
                title="Join Waitlist"
                style={{
                  opacity: 1,
                  animation: "blurDown 1s ease 0.3s 1 normal forwards running",
                }}
              >
                <div
                  className="p-2 px-4 rounded-xl overflow-hidden"
                  style={{
                    transform:
                      "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                    transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(10.3966deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(0, 0, 0, 0) 100%)",
                      borderRadius: "12px",
                      padding: "1px",
                      mask: "linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box exclude, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)",
                      opacity: 1,
                      transition: "opacity 0.3s ease-in-out",
                      pointerEvents: "none",
                    }}
                  ></div>

                  <div
                    style={{
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle at 95.3824px 17.5001px, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
                      pointerEvents: "none",
                      opacity: 1,
                      transition: "opacity 0.3s ease-in-out",
                      filter: "blur(10px)",
                      zIndex: 0,
                    }}
                  ></div>

                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      flex: "1 1 0%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    Upload Certificate
                  </div>
                </div>
              </button>
              </Link> 
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
