import React from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className=" h-96 px-30 py-10 bg-black  relative overflow-hidden  border-b border-neutral-900 md:border-b-0">
      <div className="flex justify-between">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-semibold">CredVault</h1>
          <p className="text-sm max-w-lg text-neutral-500">CredVault ensures the authenticity of academic certificates with AI-powered forgery detection and blockchain validation.</p>
          <div className="flex mt-10 gap-5">
          <FaXTwitter size={30} />
          <FaLinkedin size={30} />
          <FaInstagramSquare size={30} />
          </div>
        </div>
        <div className="flex gap-10">
            <div className="flex flex-col text-neutral-400 gap-1">
                <h1 className="font-semibold text-neutral-300 mb-3">Product</h1>
                <h1>Features</h1>
                <h1>Pricing</h1>
                <h1>Integrations</h1>
            </div>
            <div className="flex text-neutral-400 flex-col gap-1">
                <h1 className="font-semibold text-neutral-300 mb-3">Resources</h1>
                <h1>Documentation</h1>
                <h1>Tutorials</h1>
                <h1>Blog</h1>
                <h1>Support</h1>
            </div>
            <div className="flex text-neutral-400 flex-col gap-1">
                <h1 className="font-semibold text-neutral-300 mb-3">Company</h1>
                <h1>About</h1>
                <h1>Careers</h1>
                <h1>Contact</h1>
                <h1>Partners</h1>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
