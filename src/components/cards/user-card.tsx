"use client";

import { Row } from "@tanstack/react-table";
import { CalendarCheck2, CalendarOffIcon, LucideHouse, MapIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatPromiseDate } from "@/lib/format-date";
import { User } from "@/lib/types";

interface UserCardProps {
  row: Row<User>;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onView: (user: User) => void;
}

export function UserCard({ row, onEdit, onDelete, onView }: UserCardProps) {
  const user = row.original;

  const date = formatDate(user.expirydate);
  const promiseDate = formatPromiseDate(user.promise_date); // Format Promise Date

  return (
    <Card className="shadow-sm hover:shadow-lg transition-all">
      <CardContent className="p-4 flex gap-4">
        <div className="relative my-auto">
          <UserIcon className="h-8 w-8 text-gray-500" />
          {/* Active/Inactive Dot */}
          {user.customer_status === "active" ? (
            <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500" />
          ) : (
            <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-gray-500" />
          )}
        </div>
        <div className="flex flex-col gap-1 flex-grow">
          <div className="flex items-center gap-2">

            <div>
              <h3 className="font-semibold text-md">{user.full_name}</h3>
              <p className="text-xs text-muted-foreground">{user.username}</p>
            </div>
          </div>

          {/* Expiry and Address */}
          <div className="flex flex-col text-[10px] text-muted-foreground gap-1">
            <p className="flex items-center gap-1">
              <CalendarCheck2 className="h-3 w-3 text-muted-foreground" />
              Expires {date}
            </p>
            <p className="flex items-center gap-1">
              <LucideHouse className="h-3 w-3 text-muted-foreground" />
              {user.address}
            </p>
          </div>
        </div>

        {/* Fees, Promise Date, Balance Due */}
        <div className="flex flex-col items-end gap-1">
          {user.monthlyfees && <p className="px-2 py-1 text-xs">{`Fees ${user.monthlyfees}`}</p>}
          {user.promise_date && <p className="text-xs text-muted-foreground">{promiseDate} (PR)</p>}
          {user.balance_due && user.balance_due !== "0.00" && (
            <p className="text-xs font-semibold text-red-500">
              {user.balance_due} (Due)
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
