"use client"

import { useState } from "react"

interface PublicContentProps {
  activeTab: string
}

export function PublicContent({ activeTab }: PublicContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">
                Seetha Rama Vivaha Trust Bhavani
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Dedicated to preserving traditions and supporting our community through meaningful ceremonies and charitable activities.
              </p>
            </div>
          </div>
        )
      
      case "about":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">About Us</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                The Seetha Rama Vivaha Trust is committed to upholding cultural traditions and supporting our community through various initiatives and ceremonies.
              </p>
            </div>
          </div>
        )
      
      case "events":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Events</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                Stay updated with our upcoming ceremonies, festivals, and community events.
              </p>
            </div>
          </div>
        )
      
      case "gallery":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Gallery</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                Explore moments from our ceremonies and community gatherings.
              </p>
            </div>
          </div>
        )
      
      case "contact":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Contact Us</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">
                Get in touch with us for more information about our activities and how you can be involved.
              </p>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Seetha Rama Vivaha Trust Bhavani
            </h1>
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {renderContent()}
    </div>
  )
}