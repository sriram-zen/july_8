"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, LayoutDashboard, Plus, Users, FileText, MessageSquare, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AdminTabs() {
  return (
    <div className="w-full">
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Home
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="space-y-8">
          <HomeContent />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-8">
          <DashboardContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function HomeContent() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Welcome to Trust Management
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Seetha Rama Vivaha Trust Bhavani - Digital platform for managing donations and devotee services
        </p>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border text-center">
          <Users className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-lg mb-2">Devotee Services</h3>
          <p className="text-muted-foreground text-sm">
            Manage devotee registrations and maintain comprehensive records
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border text-center">
          <FileText className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-lg mb-2">Digital Receipts</h3>
          <p className="text-muted-foreground text-sm">
            Automated receipt generation and delivery system
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border text-center">
          <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-lg mb-2">Donation Tracking</h3>
          <p className="text-muted-foreground text-sm">
            Comprehensive donation management and reporting
          </p>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-muted p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">System Status</h4>
            <p className="text-sm text-muted-foreground">All services operational • Last updated: Just now</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-foreground">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button asChild className="h-auto p-4 bg-primary hover:bg-primary/90">
            <Link href="/protected/donations/manual" className="flex flex-col items-center gap-2">
              <Plus className="w-6 h-6" />
              <span className="font-medium">Manual Donation</span>
              <span className="text-xs opacity-80">Add cash donation</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto p-4">
            <Link href="/protected/devotees" className="flex flex-col items-center gap-2">
              <Users className="w-6 h-6" />
              <span className="font-medium">Devotee Registration</span>
              <span className="text-xs opacity-80">Manage devotees</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto p-4">
            <Link href="/protected/receipts" className="flex flex-col items-center gap-2">
              <FileText className="w-6 h-6" />
              <span className="font-medium">Digital Receipts</span>
              <span className="text-xs opacity-80">View & manage</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-auto p-4">
            <Link href="/protected/whatsapp" className="flex flex-col items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              <span className="font-medium">WhatsApp</span>
              <span className="text-xs opacity-80">Communication pilot</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Management Features */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Management Features</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Digital Receipt Automation</h3>
                <p className="text-muted-foreground text-sm">Automated processing & delivery</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Today's receipts:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending delivery:</span>
                <span className="font-medium">0</span>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full mt-4">
              <Link href="/protected/receipts">View All Receipts</Link>
            </Button>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Devotee Management</h3>
                <p className="text-muted-foreground text-sm">Registration & ID management</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total devotees:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">New today:</span>
                <span className="font-medium">0</span>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full mt-4">
              <Link href="/protected/devotees">Manage Devotees</Link>
            </Button>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">Cash Donations</h3>
                <p className="text-muted-foreground text-sm">Manual entry & tracking</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Today's total:</span>
                <span className="font-medium">₹0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Entries today:</span>
                <span className="font-medium">0</span>
              </div>
            </div>
            <Button asChild className="w-full mt-4">
              <Link href="/protected/donations/manual">Add Cash Donation</Link>
            </Button>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-card-foreground">WhatsApp Integration</h3>
                <p className="text-muted-foreground text-sm">Communication pilot</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending approval:</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sent today:</span>
                <span className="font-medium">0</span>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="w-full mt-4">
              <Link href="/protected/whatsapp">Manage Messages</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}