import { 
  MessageSquareText,
  CircleDollarSign,
  UserRound,
  Settings,
  TextAlignStart,
  Info,
  LogOut
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const colors = {
    background: {
      main: '#F8FAFC',
      sidebar: '#F5F7FA',
      card: '#FFFFFF',
      input: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#64748B',
      muted: '#94A3B8',
    },
    border: {
      default: '#E5E7EB',
      hover: '#CBD5E1',
    },
    accent: {
      primary: '#6366F1',
      primaryHover: '#4F46E5',
      soft: '#EEF2FF',
    },
    status: {
      online: '#10B981',
      offline: '#94A3B8',
      busy: '#F59E0B',
      error: '#DC2626',
      success: '#059669',
  },
  chart: {
    price: '#6366F1',
    ma: '#94A3B8',
    resistance: '#DC2626',
    support: '#059669',
    volume: '#CBD5E1',
  }
};

// spacing.ts
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
};

export const radius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '10px',
  '2xl': '12px',
  full: '9999px',
};

export type routesProps = {}

export const routeIcons: Record<string, LucideIcon> = {
  "/dashboard/chatBot": MessageSquareText,
  "/dashboard/cryptoAgent": CircleDollarSign,
  "/dashboard/cvMakerAgent": TextAlignStart,
}

export const menuLabels = [
  {
    id: "group1",
    groups: [
      {
        title: "profile",
        Icon: UserRound,
      },
      {
        title: "Settings",
        Icon: Settings,
      },
      {
        title: "My CVs",
        Icon: TextAlignStart,
      },
    ],
  },
  {
    id: "group2",
    groups: [
      {
        title: "Help & support",
        Icon: Info,
      },
      {
        title: "What's new",
        Icon: Info,
      },
    ],
  },
  {
    id: "group3",
    groups: [
      {
        title: "Log out",
        Icon: LogOut,
      },
    ],
  },
];
