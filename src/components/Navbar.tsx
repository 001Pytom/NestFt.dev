"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Package,
  GitBranch,
  LayoutDashboard,
  User,
  Menu, 
  X,
  // Award,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuthStore } from "../lib/store";
import Image from "next/image";
import { useEffect} from "react";
import { getOrCreateUserProfile, UserProfile } from "@/lib/database";

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  useEffect(() => {
    if (user && isAuthenticated) {
      loadUserProfile();
    }
  }, [user, isAuthenticated]);
  
  const loadUserProfile = async () => {
    if (!user) return;
    try {
      const profile = await getOrCreateUserProfile(user.id, user);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const isActive = (path: string) => pathname === path;

  // const handleLogin = async (provider: "github" | "google") => {
  //   try {
  //     await login(provider);
  //     router.push("/dashboard");
  //   } catch (error) {
  //     console.error("Login error:", error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-24">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2 group"
          >
            <Image
              src="/logo.png"
              alt="NestFT.dev Logo"
              width={42}
              height={42}
              className="transition-transform group-hover:rotate-6"
            />
            <p className="text-[1.6rem] font-bold text-gray-900 font-noto tracking-tight group-hover:text-primary">
              NestFT<span className="text-primary">.dev</span>
            </p>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/dashboard") ? "text-primary" : "text-black"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/projects/browse"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/projects/browse") ? "text-primary" : "text-black"
                }`}
              >
                Projects
              </Link>
              <Link
                href="/leaderboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/leaderboard") ? "text-primary" : "text-black"
                }`}
              >
                Leaderboard 
              </Link>
              <Link
                href="/certificates"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/certificates") ? "text-primary" : "text-black"
                }`}
              > 
                Certificates
              </Link>
              <Link href="/profile" className="ml-4">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.avatar_url}
                    alt={user?.user_metadata?.name}
                  />
                  <AvatarFallback>
                    {user?.user_metadata?.name?.charAt(0) ||
                      user?.email?.charAt(0) ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/features"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/features") ? "text-primary" : "text-black"
                }`}
              >
                Features
              </Link>
               <Link
                href="/about"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/about") ? "text-primary" : "text-black"
                }`}
              >
                About
              </Link>
              <Link
                href="/faq"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/faq") ? "text-primary" : "text-black"
                }`}
              >
                FAQ
              </Link>
              <Button
                variant="default"
                size="sm"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center rounded-md p-2 text-foreground"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 flex flex-col gap-4 border-t animate-in slide-in-from-top-5">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 pb-3 mb-2 border-b">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.avatar_url}
                    alt={user?.user_metadata?.name}
                  />
                  <AvatarFallback>
                    {user?.user_metadata?.name?.charAt(0) ||
                      user?.email?.charAt(0) ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user?.user_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {userProfile?.current_stage ? 
                      `${userProfile.current_stage.charAt(0).toUpperCase() + userProfile.current_stage.slice(1)} Level` : 
                      user?.email
                    }
                  </div>
                </div>
              </div>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted"
                onClick={closeMenu}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/projects"
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted"
                onClick={closeMenu}
              >
                <Package className="h-4 w-4" />
                <span>Projects</span>
              </Link>
              <Link
                href="/leaderboard"
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted"
                onClick={closeMenu}
              >
                <GitBranch className="h-4 w-4" />
                <span>Leaderboard</span>
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted"
                onClick={closeMenu}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <Button
                variant="ghost"
                className="justify-start px-2"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/features"
                className="px-2 py-1 rounded-md hover:bg-muted"
                onClick={closeMenu}
              >
                Features
              </Link>
              <Link
                href="/about"
                className="px-2 py-1 rounded-md hover:bg-muted"
                onClick={closeMenu}
              >
                About
              </Link>
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    closeMenu();
                    router.push("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    closeMenu();
                    router.push("/signup");
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
