
"use client";

import Image from "next/image";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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

interface UserCardProps {
  row: Row<User>;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onView: (user: User) => void;
}

export function UserCard({ row, onEdit, onDelete, onView }: UserCardProps) {
  const user = row.original;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Image
            src={user.avatar}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
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
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="outline">{user.role}</Badge>
          <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
            {user.status}
          </Badge>
          {user.agency && <Badge variant="secondary">Agency: {user.agency}</Badge>}
          {user.package && <Badge variant="secondary">Package: {user.package}</Badge>}
        </div>
      </CardContent>
    </Card>
  );
}
