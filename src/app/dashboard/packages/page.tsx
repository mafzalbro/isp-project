
"use client";

import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table"

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
import { Checkbox } from '@/components/ui/checkbox';

import { PageHeader } from '@/components/page-header';
import { mockPackages } from '@/lib/mock-data';
import type { Package } from '@/lib/types';
import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { PackageCard } from '@/components/cards/package-card';
import { useCrud } from '@/hooks/use-crud';
import { GenericForm, FormFieldConfig } from '@/components/generic-form';

const formConfig: FormFieldConfig[] = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'speed', label: 'Speed', type: 'text' },
  { id: 'price', label: 'Price (Rs)', type: 'number' },
];

export default function PackagesPage() {
  const {
    data,
    isDialogOpen,
    isAlertDialogOpen,
    itemToEdit,
    itemToDelete,
    formData,
    openDialog,
    closeDialog,
    handleFormChange,
    handleSubmit,
    handleEditClick,
    handleDeleteClick,
    confirmDelete,
    setIsAlertDialogOpen,
    setItemToDelete,
  } = useCrud<Package>({
    storageKey: 'packages',
    mockData: mockPackages,
    entityName: 'Package',
    entityNamePlural: 'Packages',
    initialFormData: { name: '', speed: '', price: 0, dataCap: 'Unlimited', features: ['24/7 Support'] },
  });


  const columns: ColumnDef<Package>[] = [
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
      accessorKey: "speed",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Speed" />,
    },
    {
      accessorKey: "dataCap",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Data Cap" />,
    },
    {
      accessorKey: "price",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
      cell: ({ row }) => `Rs ${Number(row.original.price).toFixed(2)}/-`
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const pkg = row.original

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
              <DropdownMenuItem onClick={() => handleEditClick(pkg)}>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(pkg)}>
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
        title="Internet Packages"
        description="Manage your internet service plans."
        actions={
          <Button size="sm" className="gap-1" onClick={openDialog as () => void}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Package
            </span>
          </Button>
        }
      />
      <Dialog open={isDialogOpen} onOpenChange={(open) => open ? openDialog() : closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{itemToEdit ? 'Edit Package' : 'Add New Package'}</DialogTitle>
            <DialogDescription>
              {itemToEdit ? 'Update the details for this package.' : 'Fill in the details for the new internet package.'}
            </DialogDescription>
          </DialogHeader>
          <GenericForm
            formData={formData}
            formConfig={formConfig}
            onFormChange={handleFormChange}
            onSelectChange={() => { }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>Save Package</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the package
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
        searchPlaceholder='Filter packages...'
        renderCard={(row) => <PackageCard row={row} onEdit={handleEditClick} onDelete={handleDeleteClick} />}
      />
    </>
  );
}
