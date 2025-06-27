"use client";

import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-12 md:px-24 px-6">
      <div className="relative container mx-auto grid grid-cols-1 sm:gap-12 gap-8 md:grid-cols-2 lg:grid-cols-4 items-start">
        <div className="flex-1 flex-col gap-2">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-xl "
            >
              <Image
                src="/logo.png"
                alt="NestFT.dev Logo"
                width={45}
                height={45}
              />

              <span>NestFT.dev</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Level up your tech career by building real projects with other
            developers.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-sm">Platform</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/features"
                className="hover:text-primary transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/projects/browse"
                className="hover:text-primary transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/leaderboard"
                className="hover:text-primary transition-colors"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                href="/certificates"
                className="hover:text-primary transition-colors"
              >
                Certificates
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-sm">Resources</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/docs"
                className="hover:text-primary transition-colors"
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/guides"
                className="hover:text-primary transition-colors"
              >
                Guides
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:text-primary transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-medium text-sm">Company</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div className="absolute md:-right-15 right-0 bottom-0 hover:opacity-50 duration-500">
          <Link
            href={'https://bolt.new/'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image 
              src={'/bolt-logo.png'}
              alt="powered by bolt"
              width={100}
              height={100}
              loading="lazy"
            />  
          </Link>
        </div>    
      </div>

      <div className="container mt-8 border-t pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 NestFt.dev. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="hover:text-primary transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 
