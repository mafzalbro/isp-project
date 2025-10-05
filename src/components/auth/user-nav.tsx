"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function UserNav() {
  const router = useRouter();
  const [user, setUser] = useState<Partial<User>>({});
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar");

  const updateUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }

  useEffect(() => {
    updateUser();
    
    // Listen for storage changes to update the nav when profile is edited
    window.addEventListener('storage', updateUser);
    
    return () => {
        window.removeEventListener('storage', updateUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            {user.avatar ? (
              <AvatarImage
                src={user.avatar}
                alt="User avatar"
              />
            ) : userAvatar && (
              <AvatarImage
                src={userAvatar.imageUrl}
                alt="User avatar"
                data-ai-hint={userAvatar.imageHint}
              />
            )}
            <AvatarFallback>
              {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || 'Guest'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email || 'No email'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
              </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
              </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
