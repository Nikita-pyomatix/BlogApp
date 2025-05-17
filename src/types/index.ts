export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  profilePicture?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  profilePicture?: string | null;
  createdAt: Date;
}

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  profilePicture?: string | null;
  token: string;
} 