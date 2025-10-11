
"use client";

import { MoreHorizontal, PlusCircle, UserIcon } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table"
import { useSearchParams } from 'next/navigation';

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
import { mockUsers } from '@/lib/mock-data';
import type { User } from '@/lib/types';
import { DataTable } from '@/components/data-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { UserCard } from '@/components/cards/user-card';
import { useCrud } from '@/hooks/use-crud';
import { GenericForm, FormFieldConfig } from '@/components/generic-form';
import { formatDate, formatTime } from '@/lib/format-date';

const formConfig: FormFieldConfig[] = [
  { id: 'user_name', label: 'Name', type: 'text', placeholder: 'Jane Smith' },
  // { id: 'name', label: 'Name', type: 'text', placeholder: 'Johnathan Doe' },
  { id: 'address', label: 'Address', type: 'text', placeholder: '123 Maple St, Springfield, IL' },
  { id: 'customer_status', label: 'Customer Status', type: 'text', placeholder: 'Active' },
  { id: 'isp', label: 'ISP', type: 'text', placeholder: 'Comcast' },
  { id: 'customer_type', label: 'Customer Type', type: 'text', placeholder: 'Residential' },
  { id: 'userid', label: 'User ID', type: 'text', placeholder: 'user_12345' },
  { id: 'expirydate', label: 'Expiry Date', type: 'date', placeholder: '', }, // Date type field
  { id: 'promise_date', label: 'Promise Date', type: 'date', placeholder: '', }, // Date type field
  { id: 'monthlyfees', label: 'Monthly Fees', type: 'number', placeholder: '', }, // Number type field
];

export default function UsersPage() {
  const searchParams = useSearchParams();
  const agencyFilter = searchParams.get('user_id');

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
  } = useCrud<User>({
    storageKey: 'users',
    mockData: mockUsers,
    entityName: 'User',
    entityNamePlural: 'Users',
    initialFormData: { full_name: "", balance_due: "", username: '', address: "", customer_status: "", isp: "", customer_type: "", expirydate: "", promise_date: "", monthlyfees: "" },
  });

  const filteredData = agencyFilter
    ? data.filter(user => user.username === agencyFilter)
    : data;

  console.log(agencyFilter);


  const columns: ColumnDef<User>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),

    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    // },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="User" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="relative">
            <UserIcon className="h-8 w-8 rounded-full" />
            {/* show dot for active or inactive */}
            {row.original.customer_status === "active" ? (
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500" />
            ) : (
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
            )}
          </div>
          <div>
            <div className="font-medium">{row.original.full_name}</div>
            <div className="font-normal text-muted-foreground">{row.original.username}</div>
          </div>
        </div>
      )
    },
    {
      accessorKey: "agency",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Agency" />,
      cell: ({ row }) => row.original.isp || 'N/A',
      enableSorting: false
    },
    {
      accessorKey: "expirydate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Expiry Date" />,
      cell: ({ row }) => {
        {
          const date = formatDate(row.original.expirydate);
          const time = formatTime(row.original.expirydate);
          return (
            <>
              <div className="text-xs text-muted-foreground">{time}</div>
              <div className="text-sm text-muted-foreground">{date}</div>
            </>
          )
        }
      },
      // enableSorting: false
      sortingFn: 'datetime',
    },
    {
      accessorKey: "Customer Details",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Customer Details" />,
      cell: ({ row }) => {
        {
          const date = formatDate(row.original.expirydate);
          const time = formatTime(row.original.expirydate);
          return (
            <div>
              <div>
                <div>Custom Type: {row.original.customer_type}</div>
                <div className="text-sm text-muted-foreground">Address: {row.original.address}</div>
              </div>
            </div>
          )
        }
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      enableSorting: false
    },
    {
      accessorKey: "monthly fees",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Fees" />,
      cell: ({ row }) => <div>
        {`Rs ${row.original.monthlyfees}/-` || 'N/A'}
        {row.original.balance_due && row.original.balance_due !== "0.00" && (
          <p className="text-xs font-semibold text-red-500">
            {row.original.balance_due} (Due)
          </p>
        )}
      </div>
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

      <DataTable
        columns={columns}
        data={filteredData}
        searchColumn='name'
        searchPlaceholder='Filter users...'
        renderCard={(row) => <UserCard row={row} onEdit={handleEditClick} onDelete={handleDeleteClick} onView={handleViewClick} />}
      // facetedFilterColumns={[
      //   {
      //     column: 'status',
      //     title: 'Status',
      //     options: [
      //       { label: 'Active', value: 'active' },
      //       { label: 'Inactive', value: 'inactive' },
      //     ]
      //   }
      // ]}
      />
    </>
  );
}
