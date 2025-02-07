import { Application } from "./application.interface";

export interface ApplicationsResponse {
  status:       boolean;
  applications: Application[];
}
