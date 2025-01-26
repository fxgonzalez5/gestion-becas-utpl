import { Requirement } from "./requirement.interface";

export interface RequirementsResponse{
  status:         boolean;
  scholarshipId:  number;
  requirements:   Requirement[];
}
