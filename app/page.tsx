import Hero from "@/components/hero"
import About from "@/components/about"
import AdSlot from "@/components/ad-slot"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AdSlot type="banner" className="my-8" />
      <About />
      <AdSlot type="banner" className="my-8" />
    </main>
  )
}
