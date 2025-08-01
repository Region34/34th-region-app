"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const fullText = "Welcome To The 34th Region Of The RCCG"

  useEffect(() => {
    let currentIndex = 0
    let isDeleting = false

    const typeText = () => {
      if (!isDeleting && currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else if (isDeleting && currentIndex >= 0) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex--
      }

      if (currentIndex === fullText.length && !isDeleting) {
        setTimeout(() => {
          isDeleting = true
        }, 2000) // Pause for 2 seconds
      }

      if (currentIndex === 0 && isDeleting) {
        isDeleting = false
        setTimeout(() => {
          currentIndex = 0
        }, 500) // Short pause before restarting
      }
    }

    const interval = setInterval(typeText, isDeleting ? 50 : 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/placeholder-video.mp4" type="video/mp4" />
          {/* Fallback background */}
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
        </video>
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 min-h-[2em] flex items-center justify-center">
          <span className="typing-animation">{displayText}</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join Millions Of Redeemers Who Believe That Jesus Christ Is The Same Yesterday, Today, and Forevermore…
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Register Now
            </Button>
          </Link>
          <Link href="/explore">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-transparent"
            >
              Explore More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
