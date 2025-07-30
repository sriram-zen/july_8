"use client";

import { useState, useTransition } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2 } from "lucide-react";
import { encodedRedirect } from "@/utils/utils";
import { signInAction } from "@/actions/auth";
import { simpleSignInAction } from "@/actions/simple-auth";
import { clientAuth } from "@/lib/client-auth";

interface AdminSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSignInModal({ isOpen, onClose }: AdminSignInModalProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const form = new FormData();
    form.append('username', formData.username);
    form.append('password', formData.password);
    
    startTransition(async () => {
      try {
        // Try the new API-based auth first (most reliable)
        let result = await clientAuth.signIn(formData.username, formData.password);
        
        if (result.success) {
          onClose();
          window.location.href = "/admin";
          return;
        }
        
        // If API auth fails, try Supabase auth
        console.log('API auth failed, trying Supabase auth:', result.error);
        result = await signInAction(form);
        
        if (result.success) {
          onClose();
          window.location.href = "/admin";
          return;
        }
        
        // If Supabase auth fails, try simple server action auth
        console.log('Supabase auth failed, trying simple auth:', result.error);
        result = await simpleSignInAction(form);
        
        if (result.success) {
          onClose();
          window.location.href = "/admin";
        } else {
          // Show the most user-friendly error message
          if (result.error?.includes('Invalid admin credentials')) {
            setError("Invalid admin credentials");
          } else {
            setError(result.error || "Authentication failed");
          }
        }
      } catch (err) {
        console.error('Modal auth error:', err);
        setError("Authentication system error. Please try again.");
      }
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(""); // Clear error when user types
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-3 text-card-foreground">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary-foreground" />
            </div>
            Admin Portal Access
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Donation Management System
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="modal-username" className="text-card-foreground font-medium">
                Username
              </Label>
              <Input
                id="modal-username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Enter admin username"
                required
                disabled={isPending}
                className="bg-background border-border focus:border-primary focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="modal-password" className="text-card-foreground font-medium">
                Password
              </Label>
              <Input
                id="modal-password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter admin password"
                required
                disabled={isPending}
                className="bg-background border-border focus:border-primary focus:ring-primary/20"
              />
            </div>
            
            {error && (
              <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
            
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isPending}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || !formData.username || !formData.password}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
          
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Authorized admin access only. All activities are logged and monitored.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}