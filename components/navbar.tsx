"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import PasswordModal from "./password-modal"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const handleDatabaseAccess = () => {
    setShowPasswordModal(true)
  }

  const handlePasswordSuccess = () => {
    window.location.href = "/database"
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="RCCG 34TH REGION Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-bold text-lg hidden sm:block">RCCG 34TH REGION</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={handleDatabaseAccess} className="hover:bg-accent/50">
                Database
              </Button>
              <Button variant="ghost" className="hover:bg-accent/50">
                Tools
              </Button>
              <Button variant="ghost" className="hover:bg-accent/50">
                Login
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-accent/50"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-accent/50"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:bg-accent/50"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" onClick={handleDatabaseAccess} className="justify-start hover:bg-accent/50">
                  Database
                </Button>
                <Button variant="ghost" className="justify-start hover:bg-accent/50">
                  Tools
                </Button>
                <Button variant="ghost" className="justify-start hover:bg-accent/50">
                  Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={handlePasswordSuccess}
        correctPassword="34TH REGION"
        title="Database Access"
        description="Enter the password to access the database"
      />
    </>
  )
}
