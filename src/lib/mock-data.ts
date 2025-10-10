import {
  User,
  Package,
  Agency,
  Invoice,
  RevenueData,
  UserGrowthData,
  BandwidthData,
  TicketData,
  UserRole,
} from "./types";

// export const mockUsers: User[] = [
//   { id: 'usr_1', name: 'John Doe', email: 'john.doe@example.com', role: 'Agency Admin', agency: 'Tech Innovators', package: 'Pro', status: 'Active', avatar: 'https://i.pravatar.cc/40?u=usr_1' },
//   { id: 'usr_2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Support', agency: 'Creative Solutions', package: 'Basic', status: 'Active', avatar: 'https://i.pravatar.cc/40?u=usr_2' },
//   { id: 'usr_3', name: 'Admin User', email: 'admin@netops.com', role: 'Super Admin', status: 'Active', avatar: 'https://i.pravatar.cc/40?u=usr_3' },
//   { id: 'usr_4', name: 'Mike Johnson', email: 'mike.j@example.com', role: 'Read-Only', agency: 'Tech Innovators', package: 'Pro', status: 'Inactive', avatar: 'https://i.pravatar.cc/40?u=usr_4' },
//   { id: 'usr_5', name: 'Sarah Lee', email: 'sarah.lee@example.com', role: 'Agency Admin', agency: 'Global Connect', package: 'Enterprise', status: 'Active', avatar: 'https://i.pravatar.cc/40?u=usr_5' },
// ];

export const mockUsers: User[] = [
  {
    id: 4,
    customer_status: "active",
    isp: "optix",
    customer_type: "residential",
    userid: "streament-451",
    user_name: "Rashid",
    address: "H#238, st#12, 8/A",
    expirydate: "2025-10-31T15:00:00Z",
    promise_date: "2025-10-11",
    monthlyfees: "1200.00",
  },
  {
    id: 3,
    customer_status: "active",
    isp: "optix",
    customer_type: "residential",
    userid: "streament-45",
    user_name: "Rashid",
    address: "H#238, st#12, 8/A",
    expirydate: "2025-10-31T15:00:00Z",
    promise_date: "2025-10-11",
    monthlyfees: "1200.00",
  },
  {
    id: 2,
    customer_status: "active",
    isp: "optix",
    customer_type: "residential",
    userid: "streament-4",
    user_name: "Raheem TP",
    address: "H#238, st#12, 8/A",
    expirydate: "2025-10-31T12:00:00Z",
    promise_date: "2025-10-10",
    monthlyfees: "1400.00",
  },
  {
    id: 1,
    customer_status: "active",
    isp: "optix",
    customer_type: "residential",
    userid: "streament-3",
    user_name: "Raheem TP",
    address: "H#238, st#12, 8/A",
    expirydate: "2025-10-31T12:00:00Z",
    promise_date: "2025-10-10",
    monthlyfees: "1400.00",
  },
];

export const mockPackages: Package[] = [
  {
    id: "pkg_1",
    name: "Basic",
    speed: "50 Mbps",
    dataCap: "500 GB",
    price: 29.99,
    features: ["Basic Support", "1 Dynamic IP"],
  },
  {
    id: "pkg_2",
    name: "Pro",
    speed: "200 Mbps",
    dataCap: "1 TB",
    price: 59.99,
    features: ["Priority Support", "1 Static IP", "Advanced Firewall"],
  },
  {
    id: "pkg_3",
    name: "Enterprise",
    speed: "1 Gbps",
    dataCap: "Unlimited",
    price: 99.99,
    features: ["24/7 Dedicated Support", "5 Static IPs", "DDoS Protection"],
  },
];

export const mockAgencies: Agency[] = [
  {
    id: "agn_1",
    name: "Tech Innovators",
    admin: "John Doe",
    usersCount: 250,
    status: "Active",
  },
  {
    id: "agn_2",
    name: "Creative Solutions",
    admin: "Jane Smith",
    usersCount: 150,
    status: "Active",
  },
  {
    id: "agn_3",
    name: "Global Connect",
    admin: "Sarah Lee",
    usersCount: 500,
    status: "Active",
  },
  {
    id: "agn_4",
    name: "Future Networks",
    admin: "TBD",
    usersCount: 0,
    status: "Inactive",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "inv_1",
    userId: "usr_1",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    amount: 59.99,
    status: "Paid",
    dueDate: "2024-06-15",
    issuedDate: "2024-06-01",
  },
  {
    id: "inv_2",
    userId: "usr_2",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    amount: 29.99,
    status: "Due",
    dueDate: "2024-07-20",
    issuedDate: "2024-07-01",
  },
  {
    id: "inv_3",
    userId: "usr_5",
    userName: "Sarah Lee",
    userEmail: "sarah.lee@example.com",
    amount: 99.99,
    status: "Overdue",
    dueDate: "2024-06-25",
    issuedDate: "2024-06-05",
  },
  {
    id: "inv_4",
    userId: "usr_1",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    amount: 59.99,
    status: "Paid",
    dueDate: "2024-05-15",
    issuedDate: "2024-05-01",
  },
];

export const mockRevenueData: RevenueData[] = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 3000 },
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 4500 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 5500 },
];

export const mockUserGrowthData: UserGrowthData[] = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 240 },
  { month: "Mar", users: 290 },
  { month: "Apr", users: 320 },
  { month: "May", users: 380 },
  { month: "Jun", users: 410 },
];

export const mockBandwidthData: BandwidthData[] = Array.from(
  { length: 30 },
  (_, i) => ({
    time: `${String(Math.floor(i / 2)).padStart(2, "0")}:${
      i % 2 === 0 ? "00" : "30"
    }`,
    usage:
      Math.floor(Math.random() * (800 - 400 + 1) + 400) +
      Math.sin(i * 0.5) * 100,
  })
);

export const mockTicketData: TicketData[] = [
  { date: "Mon", new: 20, resolved: 15 },
  { date: "Tue", new: 30, resolved: 25 },
  { date: "Wed", new: 25, resolved: 28 },
  { date: "Thu", new: 40, resolved: 35 },
  { date: "Fri", new: 35, resolved: 32 },
  { date: "Sat", new: 15, resolved: 18 },
  { date: "Sun", new: 10, resolved: 12 },
];
