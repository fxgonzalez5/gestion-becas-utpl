import { Requirement } from "./requirement.interface";

export interface RequirementsResponse<T extends string> {
  status:         boolean;
  [key: string]:  number | any;
  requirements:   Requirement[];
}
