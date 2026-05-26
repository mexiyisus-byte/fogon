'use client'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Financial from '@/components/Financial'
import Project from '@/components/Project'
import Analysis from '@/components/Analysis'
import Simulator from '@/components/Simulator'
import Risks from '@/components/Risks'
import RealOptions from '@/components/RealOptions'
import Conclusion from '@/components/Conclusion'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      <Navigation />
      <Hero />
      <Financial />
      <Project />
      <Analysis />
      <Simulator />
      <Risks />
      <RealOptions />
      <Conclusion />
    </main>
  )
}
