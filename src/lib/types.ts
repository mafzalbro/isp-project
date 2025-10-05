export type UserRole = 'Super Admin' | 'Agency Admin' | 'Support' | 'Read-Only';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agency?: string;
  package?: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string;
};

export type Package = {
  id: string;
  name: string;
  speed: string;
  dataCap: string;
  price: number;
  features: string[];
};

export type Agency = {
  id: string;
  name: string;
  admin: string;
  usersCount: number;
  status: 'Active' | 'Inactive';
};

export type Invoice = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  status: 'Paid' | 'Due' | 'Overdue';
  dueDate: string;
  issuedDate: string;
};

export type RevenueData = {
  month: string;
  revenue: number;
};

export type UserGrowthData = {
  month: string;
  users: number;
};

export type BandwidthData = {
  time: string;
  usage: number;
};

export type TicketData = {
  date: string;
  new: number;
  resolved: number;
};
