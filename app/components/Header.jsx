"use client"

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function Header() {

  const {isSignedIn, user} = useUser()

  return (
    <header className="sticky top-0 z-50 border-b bg-linear-to-l from-blue-500 to-purple-500">
      <nav className="container px-4 py-3 flex items-center justify-between min-w-screen">
        <div>
          <Link href="/charts">Charts</Link>
        </div>
        <div className="flex items-center">
          <Link href={"/"}>
            <h1 className="text-[#fefdfd] text-xl sm:text-3xl text-shadow-lg/20">Paradox</h1>
          </Link>
        </div>
        <div className="flex items-center mr-3">
          {
            isSignedIn 
            ? <SignOutButton>
                <button className="text-white  py-1.5 px-3 rounded-md text-sm sm:text-md shadow-md">
                  Sign out
                </button>
              </SignOutButton> 
            : <SignInButton>
                <button className="text-blue-400 bg-white py-1.5 px-3 rounded-md text-sm sm:text-md shadow-md">
                  Sign in
                </button>
              </SignInButton>
          } 
        </div>
      </nav>
    </header>
  )
} 