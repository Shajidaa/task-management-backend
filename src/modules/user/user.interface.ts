export type UserRole = "Admin" | "Project Manager" | "Team Member";

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  created_at?: Date;
}
