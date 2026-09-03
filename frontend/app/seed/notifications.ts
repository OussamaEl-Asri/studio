import type { LucideIcon } from "lucide-react";
import { Check, Info, TriangleAlert, MessageSquareText, Clock8 } from 'lucide-react';


export const notificationIcon: Record<string, [LucideIcon, string, string]> = {
    "Success": [Check, "#ECFDF5", "#059669"],
    "Completion": [Check, "#ECFDF5", "#059669"],
    "Info": [Info, "#EFF6FF", "#2563EB"],
    "Announcement": [Info, "#EFF6FF", "#2563EB"],
    "Warning": [TriangleAlert, "#FFFBEB", "#D97706"],
    "Alert": [TriangleAlert, "#FFFBEB", "#D97706"],
    "Social": [MessageSquareText, "	#F1F5F9", "#64748B"],
    "Shared": [MessageSquareText, "	#F1F5F9", "#64748B"],
    "System": [Clock8, "#F1F5F9", "#64748B"],
    "Report": [Clock8, "#F1F5F9", "#64748B"]
}

type NotificationType =
  | "Success"
  | "Completion"
  | "Info"
  | "Announcement"
  | "Warning"
  | "Alert"
  | "Social"
  | "Shared"
  | "System"
  | "Report";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
};


export const readNotification: Notification[] = [
    {
        id: "1",
        title: "Task completed",
        message: "Your AI agent has successfully completed the requested task.",
        type: "Success",
      },
      {
        id: "3",
        title: "New feature available",
        message: "You can now use the new AI-powered CV optimization feature.",
        type: "Info",
      },
      {
        id: "5",
        title: "Storage almost full",
        message: "You have used 90% of your available storage. Consider removing old files.",
        type: "Warning",
      },
      {
        id: "7",
        title: "New message",
        message: "Sarah sent you a message about the project you shared.",
        type: "Social",
      },
      {
        id: "9",
        title: "System update",
        message: "Your AI Studio workspace has been updated to the latest version.",
        type: "System",
      },
]

export const UnreadNotifications: Notification[] = [
  
  {
    id: "2",
    title: "CV generated",
    message: "Your CV has been successfully generated and is ready to download.",
    type: "Completion",
  },
  
  {
    id: "4",
    title: "Scheduled maintenance",
    message: "AI Studio will undergo scheduled maintenance tonight at 2:00 AM.",
    type: "Announcement",
  },
  
  {
    id: "6",
    title: "Connection issue",
    message: "We couldn't connect to the AI service. Please try again.",
    type: "Alert",
  },
  
  {
    id: "8",
    title: "Project shared with you",
    message: "Alex shared an AI Studio project with you.",
    type: "Shared",
  },
  
  {
    id: "10",
    title: "Report ready",
    message: "Your crypto analysis report has finished generating.",
    type: "Report",
  },
];
