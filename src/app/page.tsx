"use client"

import { useState } from "react"
import { PublicHeader } from "@/components/public-header"
import { PublicContent } from "@/components/public-content"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        <PublicContent activeTab={activeTab} />
      </main>
      <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-4">
        <p>
          Powered by{" "}
          <a
            href="https://alchemistudio.ai"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Alchemi
          </a>
        </p>
      </footer>
    </div>
  )
}
