import { Search } from "lucide-react";
import { UserNav } from "../auth/user-nav";
import { Input } from "../ui/input";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <SidebarTrigger variant="outline" size="icon" />
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="w-full appearance-none bg-background/50 pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </div>
      <UserNav />
    </header>
  );
}
