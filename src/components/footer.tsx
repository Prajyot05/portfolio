// import clsx from "clsx";
import React from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
// import Link from "next/link";
import Bounded from "./bounded";
import { isFilled } from "@prismicio/client";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa6";

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <Bounded as="footer" className="text-slate-600">
      <div className="container mx-auto mt-20 flex flex-col gap-10 py-12 sm:flex-row sm:items-start sm:justify-between">
        {/* Tagline & Copyright */}
        <div className="flex flex-col md:flex items-center text-center sm:items-start sm:text-left gap-2">
          <p className="text-lg italic text-slate-300">
            {settings.data.tag_line}
          </p>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} {settings.data.name}
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 sm:justify-end">
          {isFilled.link(settings.data.github_link) && (
            <PrismicNextLink
              field={settings.data.github_link}
              className="text-3xl text-slate-300 transition-transform duration-200 hover:text-yellow-400"
              aria-label={settings.data.name + " on GitHub"}
            >
              <FaGithub />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.x_link) && (
            <PrismicNextLink
              field={settings.data.x_link}
              className="text-3xl text-slate-300 transition-transform duration-200 hover:text-yellow-400"
              aria-label={settings.data.name + " on Twitter"}
            >
              <FaTwitter />
            </PrismicNextLink>
          )}
          {isFilled.link(settings.data.linkedin_link) && (
            <PrismicNextLink
              field={settings.data.linkedin_link}
              className="text-3xl text-slate-300 transition-transform duration-200 hover:text-yellow-400"
              aria-label={settings.data.name + " on LinkedIn"}
            >
              <FaLinkedin />
            </PrismicNextLink>
          )}
        </div>
      </div>
    </Bounded>
  );
}
