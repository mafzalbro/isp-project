"use client";

import { Area, AreaChart, Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PageHeader } from '@/components/page-header';
import { mockBandwidthData, mockUserGrowthData } from "@/lib/mock-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const bandwidthChartConfig = {
  usage: {
    label: "Usage (Gbps)",
    color: "hsl(var(--primary))",
  },
};
const userChartConfig = {
    users: {
      label: "New Users",
      color: "hsl(var(--accent))",
    },
  };

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Usage Analytics" description="Analyze bandwidth usage and system performance." />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Real-time Bandwidth Usage</CardTitle>
            <CardDescription>Shows network traffic over the last 15 hours.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={bandwidthChartConfig} className="h-[300px] w-full">
              <AreaChart
                accessibilityLayer
                data={mockBandwidthData}
                margin={{ left: 12, right: 12, top: 10, bottom: 10 }}
              >
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} unit=" Gbps" />
                <Tooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Area
                  dataKey="usage"
                  type="natural"
                  fill="var(--color-usage)"
                  fillOpacity={0.4}
                  stroke="var(--color-usage)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>New user sign-ups over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={userChartConfig} className="h-[250px] w-full">
                        <BarChart accessibilityLayer data={mockUserGrowthData}>
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                            <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Bar dataKey="users" fill="var(--color-users)" radius={8} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>Recent high-priority system notifications.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>High CPU Usage</AlertTitle>
                        <AlertDescription>
                            Server `db-master-01` is at 92% CPU utilization.
                        </AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Service Down</AlertTitle>
                        <AlertDescription>
                            Authentication service is unresponsive.
                        </AlertDescription>
                    </Alert>
                     <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Latency Spike</AlertTitle>
                        <AlertDescription>
                           API gateway p99 latency is over 500ms.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
