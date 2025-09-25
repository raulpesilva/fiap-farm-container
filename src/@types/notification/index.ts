import { Transaction } from "../transactions";

export interface NotificationItem {
  id: number;
  farm_id: number;
  read: string | null;
  type: Transaction['type'];
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
}
