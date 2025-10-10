
"use client";

import Image from "next/image";
import { Row } from "@tanstack/react-table";
import { CalendarOffIcon, HomeIcon, LucideHome, MapIcon, MoreHorizontal, UserIcon } from "lucide-react";

import type { User } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/format-date";

interface UserCardProps {
  row: Row<User>;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onView: (user: User) => void;
}

export function UserCard({ row, onEdit, onDelete, onView }: UserCardProps) {
  const user = row.original;

  const date = formatDate(user.expirydate);
  const promise_date = formatDate(user.promise_date);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="relative mr-1">
            <UserIcon className="h-8 w-8 rounded-full" />
            {/* show dot for active or inactive */}
            {user.customer_status === "active" ? (
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500" />
            ) : (
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-gray-500" />
            )}
          </div>
          <div>
            <h3 className="font-semibold">{user.user_name}</h3>
            <p className="text-sm text-muted-foreground">{user.userid}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(user)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onView(user)}>View Details</DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(user)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 justify-between items-end text-sm">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground flex"><CalendarOffIcon className="mr-2 h-4 w-4" /> Expires {date}</p>
            <p className="text-sm text-muted-foreground flex"><MapIcon className="mr-2 h-4 w-4" /> {user.address}</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            {user.monthlyfees && <Badge variant="secondary">Fees: {user.monthlyfees}</Badge>}
            {user.promise_date && <p className="text-xs mr-2">
              {promise_date}
            </p>
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
