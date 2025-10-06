
"use client";

import { PlusCircle } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { PageHeader } from '@/components/page-header';
import { mockAgencies } from '@/lib/mock-data';
import type { Agency } from '@/lib/types';
import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal } from 'lucide-react';
import { AgencyCard } from '@/components/cards/agency-card';
import { useCrud } from '@/hooks/use-crud';
import { GenericForm, FormFieldConfig } from '@/components/generic-form';

const formConfig: FormFieldConfig[] = [
  { id: 'name', label: 'Agency Name', type: 'text' },
  { id: 'admin', label: 'Admin Email', type: 'email' },
];

export default function AgenciesPage() {
  const router = useRouter();
  const {
    data,
    isDialogOpen,
    isAlertDialogOpen,
    itemToEdit,
    itemToDelete,
    formData,
    readOnly,
    openDialog,
    closeDialog,
    handleFormChange,
    handleSubmit,
    handleEditClick,
    handleDeleteClick,
    confirmDelete,
    setIsAlertDialogOpen,
    setItemToDelete,
  } = useCrud<Agency>({
    storageKey: 'agencies',
    mockData: mockAgencies,
    entityName: 'Agency',
    entityNamePlural: 'Agencies',
    initialFormData: { name: '', admin: '', usersCount: 0, status: 'Active' },
  });

  const handleViewUsers = (agencyName: string) => {
    router.push(`/dashboard/users?agency=${encodeURIComponent(agencyName)}`);
  }

  const columns: ColumnDef<Agency>[] = [
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
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    },
    {
      accessorKey: "admin",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Admin" />,
    },
    {
      accessorKey: "usersCount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="User Count" />,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'Active' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const agency = row.original

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
              <DropdownMenuItem onClick={() => handleEditClick(agency)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleViewUsers(agency.name)}>View Users</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(agency)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <>
      <PageHeader
        title="Agencies"
        description="Manage partner agencies and their users."
        actions={
          <Button size="sm" className="gap-1" onClick={() => openDialog()}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Agency
            </span>
          </Button>
        }
      />
      <Dialog open={isDialogOpen} onOpenChange={(open) => open ? openDialog() : closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{itemToEdit ? 'Edit Agency' : 'Add New Agency'}</DialogTitle>
            <DialogDescription>
              {itemToEdit ? 'Update the details for this agency.' : 'Fill in the details for the new agency.'}
            </DialogDescription>
          </DialogHeader>
          <GenericForm
            formData={formData}
            formConfig={formConfig}
            onFormChange={handleFormChange}
            onSelectChange={() => { }}
            readOnly={readOnly}
          />
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            {!readOnly && <Button type="submit" onClick={handleSubmit}>Save Agency</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the agency
              "{itemToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DataTable
        columns={columns}
        data={data}
        searchColumn='name'
        searchPlaceholder='Filter agencies...'
        renderCard={(row) => <AgencyCard row={row} onEdit={handleEditClick} onDelete={handleDeleteClick} onViewUsers={handleViewUsers} />}
      />
    </>
  );
}
