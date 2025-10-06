
"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { DollarSign, Users, LifeBuoy, Activity } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { TicketsChart } from "@/components/dashboard/tickets-chart";
import type { User, Invoice } from "@/lib/types";
import { mockRevenueData, mockTicketData } from "@/lib/mock-data";

export default function DashboardPage() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        const invoices: Invoice[] = JSON.parse(storedInvoices);
        const revenue = invoices
          .filter(invoice => invoice.status === 'Paid')
          .reduce((sum, invoice) => sum + invoice.amount, 0);
        setTotalRevenue(revenue);
      }

      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const users: User[] = JSON.parse(storedUsers);
        const activeUserCount = users.filter(user => user.status === 'Active').length;
        setActiveUsers(activeUserCount);
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    }
  }, []);

  return (
    <>
      <PageHeader title="Dashboard" description="Here's a snapshot of your network operations." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          value={`Rs ${totalRevenue.toFixed(2)}/-`}
          icon={<DollarSign className="h-4 w-4" />}
          description="+20.1% from last month"
        />
        <KpiCard
          title="Active Users"
          value={`+${activeUsers}`}
          icon={<Users className="h-4 w-4" />}
          description="+180.1% from last month"
        />
        <KpiCard
          title="Open Tickets"
          value="12"
          icon={<LifeBuoy className="h-4 w-4" />}
          description="+5 since yesterday"
        />
        <KpiCard
          title="System Status"
          value="99.9% Uptime"
          icon={<Activity className="h-4 w-4" />}
          description="All systems operational"
        />
      </div>

      <div className="grid gap-4 mt-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RevenueChart data={mockRevenueData} />
        </div>
        <div className="lg:col-span-3">
          <TicketsChart data={mockTicketData} />
        </div>
      </div>
    </>
  );
}
