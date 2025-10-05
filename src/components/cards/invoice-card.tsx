
"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import type { Invoice } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, BadgeProps } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InvoiceCardProps {
  row: Row<Invoice>;
  getBadgeVariant: (status: Invoice['status']) => BadgeProps['variant'];
  onViewDetails: (invoice: Invoice) => void;
  onSendReminder: (invoice: Invoice) => void;
  onDownloadPdf: (invoice: Invoice) => void;
}

export function InvoiceCard({ row, getBadgeVariant, onViewDetails, onSendReminder, onDownloadPdf }: InvoiceCardProps) {
  const invoice = row.original;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-semibold">{invoice.userName}</h3>
            <p className="text-sm text-muted-foreground">{invoice.userEmail}</p>
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
            <DropdownMenuItem onClick={() => onViewDetails(invoice)}>View Details</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSendReminder(invoice)}>Send Reminder</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDownloadPdf(invoice)}>Download PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
            <div>
                <div className="text-2xl font-bold">Rs {invoice.amount.toFixed(2)}/-</div>
                <p className="text-xs text-muted-foreground">Due: {invoice.dueDate}</p>
            </div>
            <Badge variant={getBadgeVariant(invoice.status)}>
                {invoice.status}
            </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
