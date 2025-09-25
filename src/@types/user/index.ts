export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
};

export type PublicUser = Omit<User, 'password'>;
