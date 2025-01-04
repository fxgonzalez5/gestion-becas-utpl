import { Scholarship } from "./scholarship.interface";

export interface ScholarshipsResponse {
  status:       boolean;
  scholarships: Scholarship[];
}
