
"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import Header from "./header";
import { SidebarHeader, SidebarContent, SidebarFooter } from "../ui/sidebar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-8 w-8 text-primary"
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
          {!isCollapsed && <h1 className="text-xl font-semibold font-headline">NetOps</h1>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <Button asChild variant="ghost" className={`w-full justify-start gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
          <Link href="/login">
            <LogOut size={16} />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </Button>
      </SidebarFooter>
    </>
  );
}


export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="absolute top-0 left-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%233b82f6%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      <div className="relative">
        <SidebarProvider>
          <Sidebar variant="sidebar" collapsible="icon" className="border-r bg-sidebar backdrop-blur-sm">
            <AppSidebar />
          </Sidebar>
          <SidebarInset>
            <Header />
            <main className="p-4 sm:p-6 lg:p-8 bg-transparent">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
