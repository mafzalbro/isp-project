
"use client";

import { Row } from "@tanstack/react-table";
import { Building2, MoreHorizontal, Users } from "lucide-react";

import type { Agency } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AgencyCardProps {
  row: Row<Agency>;
  onEdit: (agency: Agency) => void;
  onDelete: (agency: Agency) => void;
  onViewUsers: (agencyName: string) => void;
}

export function AgencyCard({ row, onEdit, onDelete, onViewUsers }: AgencyCardProps) {
  const agency = row.original;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
                <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
                <CardTitle className="text-lg">{agency.name}</CardTitle>
                <p className="text-sm text-muted-foreground">Admin: {agency.admin}</p>
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
            <DropdownMenuItem onClick={() => onEdit(agency)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewUsers(agency.name)}>View Users</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => onDelete(agency)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
         <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{agency.usersCount} Users</span>
         </div>
        <Badge variant={agency.status === 'Active' ? 'default' : 'secondary'}>
          {agency.status}
        </Badge>
      </CardContent>
    </Card>
  );
}
