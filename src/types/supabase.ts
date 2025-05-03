export type Profile = {
  id: string;
  email: string;
  full_name?: string;
  is_admin: boolean;
  created_at: string;
  avatar_url?: string;
};

export type Website = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  created_at: string;
  updated_at: string;
}; 