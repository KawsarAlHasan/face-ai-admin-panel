interface MonthlyStats {
  month: string;
  newUsers: number;
  totalUsers: number;
  newSubscriptions: number;
  totalSubscriptions: number;
  monthlyEarning: number;
}

export interface IAnalatycs {
  year: number;
  totalUsers: number;
  totalBookings: number;
  totalEarning: number;
  totalSubscriptions: number;
  monthlyData: MonthlyStats[];
}


export interface IUser {
  _id: string;
  name: string;
  profilePic: string | null;
  isVerifiedHost: boolean;
  email: string;
  contact: string;
  address: string;
  connectedAccountId: string | null;
  stripeConnectedLink: string | null;
  dateOfBirth: string; // ISO string (e.g., "2003-09-11T18:00:00.000Z")
  images: string[];
  status: "active" | "inactive" | string;
  role: "guest" | "host" | "admin" | string;
  verified: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  airlineVerification: string | null;
}

export interface IPagination {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
}

export interface IFacility {
  _id: string;
  name: string;
  logo: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}


export interface IPackage {
  _id: string;
  title: string;
  price: number;
  billingCycle: string; // e.g. "add-on"
  description: string;
  features: string[];
  active: boolean;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  __v: number;
}

export interface IReview {
  _id: string;
  hotel: string;
  content: string;
  user: {
    _id: string;
    name: string;
    email: string;
    id: string;
  };
  rating: number;
  isVisible: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
}

export interface INotification {
  _id: string;
  title: string;
  refId: string;
  path: string;
  message: string;
  seen: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  receiver: string;
}

