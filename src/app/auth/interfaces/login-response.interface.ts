import { User } from "./user.interface";

export interface LoginResponse {
  status: boolean;
  user:   User;
  token:  string;
}
