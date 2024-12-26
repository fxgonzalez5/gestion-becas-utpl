import { User } from "./user.interface";

export interface CheckTokenResponse {
  status: boolean;
  user:   User;
  token:  string;
}
