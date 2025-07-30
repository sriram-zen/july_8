"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const navigationTabs = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" }
]

interface PublicNavigationProps {
  activeTab?: string
  onTabChange?: (tabId: string) => void
}

export function PublicNavigation({ activeTab = "home", onTabChange }: PublicNavigationProps) {
  const [currentTab, setCurrentTab] = useState(activeTab)

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <nav className="flex space-x-8">
      {navigationTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            currentTab === tab.id
              ? "text-primary border-b-2 border-primary pb-1"
              : "text-muted-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}