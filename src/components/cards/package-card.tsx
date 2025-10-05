
"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import type { Package } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PackageCardProps {
  row: Row<Package>;
  onEdit: (pkg: Package) => void;
  onDelete: (pkg: Package) => void;
}

export function PackageCard({ row, onEdit, onDelete }: PackageCardProps) {
  const pkg = row.original;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div>
            <CardTitle className="text-lg">{pkg.name}</CardTitle>
            <CardDescription>{pkg.speed} - {pkg.dataCap} Data</CardDescription>
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
            <DropdownMenuItem onClick={() => onEdit(pkg)}>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={() => onDelete(pkg)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Rs {pkg.price.toFixed(2)}/-</div>
        <p className="text-xs text-muted-foreground">per month</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1">
        {pkg.features.map(feature => (
          <Badge key={feature} variant="outline">{feature}</Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
