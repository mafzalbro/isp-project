

"use client";

import { useState, useEffect } from 'react';
import { MoreHorizontal, FileDown } from 'lucide-react';
import {
  ColumnDef,
} from "@tanstack/react-table"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from '@/components/ui/checkbox';

import { PageHeader } from '@/components/page-header';
import { mockInvoices } from '@/lib/mock-data';
import type { Invoice } from '@/lib/types';
import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { InvoiceCard } from '@/components/cards/invoice-card';
import { useToast } from '@/hooks/use-toast';
import { GenericForm, FormFieldConfig } from '@/components/generic-form';

const formConfig: FormFieldConfig[] = [
    { id: 'userName', label: 'Customer', type: 'text' },
    { id: 'userEmail', label: 'Email', type: 'email' },
    { id: 'amount', label: 'Amount', type: 'number' },
    { id: 'status', label: 'Status', type: 'text' },
    { id: 'issuedDate', label: 'Issued Date', type: 'text' },
    { id: 'dueDate', label: 'Due Date', type: 'text' },
];


export default function BillingPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);


    useEffect(() => {
        const storedInvoices = localStorage.getItem('invoices');
        if (storedInvoices) {
            setInvoices(JSON.parse(storedInvoices));
        } else {
            localStorage.setItem('invoices', JSON.stringify(mockInvoices));
            setInvoices(mockInvoices);
        }
    }, []);

    const getBadgeVariant = (status: Invoice['status']) => {
        switch (status) {
            case 'Paid': return 'default';
            case 'Due': return 'secondary';
            case 'Overdue': return 'destructive';
            default: return 'outline';
        }
    }

    const handleExport = () => {
        toast({ title: 'Exporting Data', description: 'Your invoice data is being exported.' });
    };

    const handleViewDetails = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsDialogOpen(true);
    };

    const handleSendReminder = (invoice: Invoice) => {
        toast({ title: 'Reminder Sent', description: `An invoice reminder has been sent to ${invoice.userName}.` });
    };

    const handleDownloadPdf = (invoice: Invoice) => {
        toast({ title: 'Downloading PDF', description: `Downloading invoice ${invoice.id}.pdf.` });
    };

    const columns: ColumnDef<Invoice>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "userName",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Customer" />,
        cell: ({ row }) => (
          <div>
            <div>{row.original.userName}</div>
            <div className="text-sm text-muted-foreground">{row.original.userEmail}</div>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => (
          <Badge variant={getBadgeVariant(row.original.status)}>
            {row.original.status}
          </Badge>
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: "amount",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
        cell: ({ row }) => `Rs ${row.original.amount.toFixed(2)}/-`
      },
      {
        accessorKey: "issuedDate",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Issued Date" />,
      },
      {
        accessorKey: "dueDate",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
      },
      {
        id: "actions",
        cell: ({ row }) => {
            const invoice = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleViewDetails(invoice)}>View Details</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSendReminder(invoice)}>Send Reminder</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownloadPdf(invoice)}>Download PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]


  return (
    <>
      <PageHeader
        title="Billing & Invoices"
        description="View and manage all customer invoices."
        actions={
            <Button size="sm" variant="outline" className="gap-1" onClick={handleExport}>
                <FileDown className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
                </span>
            </Button>
        }
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Invoice Details</DialogTitle>
                <DialogDescription>
                    Viewing details for invoice {selectedInvoice?.id}.
                </DialogDescription>
            </DialogHeader>
            {selectedInvoice && (
                <GenericForm
                    formData={selectedInvoice}
                    formConfig={formConfig}
                    onFormChange={() => {}}
                    onSelectChange={() => {}}
                    readOnly={true}
                />
            )}
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>


       <DataTable 
          columns={columns} 
          data={invoices} 
          searchColumn='userName'
          searchPlaceholder='Filter by customer...'
          renderCard={(row) => 
            <InvoiceCard 
              row={row} 
              getBadgeVariant={getBadgeVariant} 
              onViewDetails={handleViewDetails}
              onSendReminder={handleSendReminder}
              onDownloadPdf={handleDownloadPdf}
            />
          }
          facetedFilterColumns={[
            {
              column: 'status',
              title: 'Status',
              options: [
                { label: 'Paid', value: 'Paid' },
                { label: 'Due', value: 'Due' },
                { label: 'Overdue', value: 'Overdue' },
              ]
            }
          ]}
        />
    </>
  );
}
