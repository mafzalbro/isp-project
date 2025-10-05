
"use client";

import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { ColumnDef } from "@tanstack/react-table"
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

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
import { Checkbox } from '@/components/ui/checkbox';
import { PageHeader } from '@/components/page-header';
import { mockUsers } from '@/lib/mock-data';
import type { User } from '@/lib/types';
import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { UserCard } from '@/components/cards/user-card';
import { useCrud } from '@/hooks/use-crud';
import { GenericForm, FormFieldConfig } from '@/components/generic-form';

const formConfig: FormFieldConfig[] = [
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'role', label: 'Role', type: 'select', placeholder: 'Select a role', options: [
        { value: 'Super Admin', label: 'Super Admin' },
        { value: 'Agency Admin', label: 'Agency Admin' },
        { value: 'Support', label: 'Support' },
        { value: 'Read-Only', label: 'Read-Only' },
    ]},
];

export default function UsersPage() {
    const searchParams = useSearchParams();
    const agencyFilter = searchParams.get('agency');

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
        handleSelectChange,
        handleSubmit,
        handleEditClick,
        handleViewClick,
        handleDeleteClick,
        confirmDelete,
        setIsAlertDialogOpen,
        setItemToDelete,
    } = useCrud<User>({
        storageKey: 'users',
        mockData: mockUsers,
        entityName: 'User',
        entityNamePlural: 'Users',
        initialFormData: { name: '', email: '', role: 'Read-Only', status: 'Active', avatar: `https://i.pravatar.cc/40?u=usr_${Date.now()}` },
    });

    const filteredData = agencyFilter 
        ? data.filter(user => user.agency === agencyFilter) 
        : data;

    const columns: ColumnDef<User>[] = [
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
        header: ({ column }) => <DataTableColumnHeader column={column} title="User" />,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Image
              src={row.original.avatar}
              alt={row.original.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="font-medium">{row.original.name}</div>
          </div>
        )
      },
      {
        accessorKey: "role",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
        cell: ({ row }) => (
          <Badge variant={row.original.status === 'Active' ? 'default' : 'secondary'}>
            {row.original.status}
          </Badge>
        ),
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: "agency",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Agency" />,
        cell: ({ row }) => row.original.agency || 'N/A'
      },
      {
        accessorKey: "package",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Package" />,
        cell: ({ row }) => row.original.package || 'N/A'
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original
     
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
                <DropdownMenuItem onClick={() => handleEditClick(user)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleViewClick(user)}>View Details</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(user)}>
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
        title={agencyFilter ? `Users for ${agencyFilter}` : 'Users'}
        description="Manage all user accounts in the system."
        actions={
          <Button size="sm" className="gap-1" onClick={() => openDialog()}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add User
              </span>
          </Button>
        }
      />
      <Dialog open={isDialogOpen} onOpenChange={(open) => open ? openDialog() : closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{readOnly ? 'User Details' : (itemToEdit ? 'Edit User' : 'Add New User')}</DialogTitle>
            <DialogDescription>
              {readOnly ? 'Viewing user details.' : (itemToEdit ? 'Update the details for this user.' : 'Create a new user account and assign a role.')}
            </DialogDescription>
          </DialogHeader>
          <GenericForm
            formData={formData}
            formConfig={formConfig}
            onFormChange={handleFormChange}
            onSelectChange={handleSelectChange}
            readOnly={readOnly}
          />
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            {!readOnly && <Button type="submit" onClick={handleSubmit}>Save User</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the user
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
        data={filteredData}
        searchColumn='name'
        searchPlaceholder='Filter users...'
        renderCard={(row) => <UserCard row={row} onEdit={handleEditClick} onDelete={handleDeleteClick} onView={handleViewClick} />}
        facetedFilterColumns={[
          {
            column: 'role',
            title: 'Role',
            options: [
              { label: 'Super Admin', value: 'Super Admin' },
              { label: 'Agency Admin', value: 'Agency Admin' },
              { label: 'Support', value: 'Support' },
              { label: 'Read-Only', value: 'Read-Only' },
            ]
          },
          {
            column: 'status',
            title: 'Status',
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
            ]
          }
        ]}
       />
    </>
  );
}
