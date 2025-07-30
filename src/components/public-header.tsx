"use client"

import { useState } from "react"
import { PublicNavigation } from "./public-navigation"
import { Button } from "./ui/button"
import { AdminSigninModal } from "./admin-signin-modal"

interface PublicHeaderProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function PublicHeader({ activeTab, onTabChange }: PublicHeaderProps) {
  const [showAdminModal, setShowAdminModal] = useState(false)

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5">
        <PublicNavigation activeTab={activeTab} onTabChange={onTabChange} />
        
        <div className="flex gap-3 items-center">
          <Button variant="outline" size="sm">
            Donate
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => setShowAdminModal(true)}
          >
            Admin
          </Button>
        </div>
      </div>
      
      <AdminSigninModal 
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />
    </nav>
  )
}