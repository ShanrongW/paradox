"use client"

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Header() {

  const {isSignedIn, user} = useUser()

  return (
    <header className="sticky top-0 z-50 border-b bg-gradient-to-l from-white to-gray-50">
      <nav className="container px-4 py-3 flex items-center justify-between min-w-screen">
        <Link href={"/"}>
          <h1 className="text-purple-500 text-xl sm:text-3xl text-shadow-lg/20">Paradox</h1>
        </Link>
        <div className="flex items-center sm:hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <Link href={"/"}>Home</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={"/charts"}>Charts</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={"/statistics/clan"}>Clan Statistics</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={"/statistics/member"}>Member Statistics</Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {
                isSignedIn &&
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Manage</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink asChild>
                      <Link href={"/manage"}>Dashboard</Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              }
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="items-center hidden sm:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href={"/"}>Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href={"/charts"}>Charts</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Statistics</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <Link href={"/statistics/clan"}>Clan</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href={"/statistics/member"}>Member</Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {
                isSignedIn &&
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Manage</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink asChild>
                      <Link href={"/manage"}>Dashboard</Link>
                    </NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              }
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center">
          {
            isSignedIn 
            ? <SignOutButton>
                <button className="text-purple-500 bg-white py-1.5 px-3 rounded-md text-sm sm:text-md shadow-md cursor-pointer">
                  Sign out
                </button>
              </SignOutButton> 
            : <SignInButton>
                <button className="text-white bg-purple-500 py-1.5 px-3 rounded-md text-sm sm:text-md shadow-md cursor-pointer">
                  Sign in
                </button>
              </SignInButton>
          } 
        </div>
      </nav>
    </header>
  )
} 