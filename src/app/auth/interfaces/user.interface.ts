export interface User {
  id:       string;
  email:    string;
  role:     string;
  has_completed_the_table: boolean | null;
  location_id: number;
}
