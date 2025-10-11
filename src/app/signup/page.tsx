"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const loginBg = PlaceHolderImages.find(img => img.id === 'login-background');


  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd create a new user.
    // For now, we'll just show a success message and redirect.
    toast({
      title: "Account Created",
      description: "Welcome! Please log in with your new credentials.",
    });
    router.push("/login");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-foreground p-4">
      {loginBg && (
        <Image
          src={loginBg.imageUrl}
          alt="Abstract background"
          data-ai-hint={loginBg.imageHint}
          fill
          className="object-cover"
        />
      )}
      <Card className="relative w-full max-w-sm bg-card/50 backdrop-blur-2xl rounded-3xl border-white/10 text-white">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-10 w-10 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12h20" />
              <path d="M12 2a10 10 0 0 1 10 10" />
              <path d="M12 22A10 10 0 0 0 22 12" />
              <path d="M12 2a10 10 0 0 0-10 10" />
              <path d="M12 22a10 10 0 0 1-10-12" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
          <CardDescription className="text-white/70">
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-white/90">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-white/70 hover:text-white hover:bg-transparent"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-white/70">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-white">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
