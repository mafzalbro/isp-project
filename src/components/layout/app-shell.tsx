
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
      <div className="relative">
        <SidebarProvider>
          <Sidebar variant="sidebar" collapsible="icon" className="border-r bg-sidebar backdrop-blur-sm">
            <AppSidebar />
          </Sidebar>
          <SidebarInset className="bg-transparent">
            <Header />
            <div className="p-4 sm:p-6 lg:p-8 bg-transparent">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
