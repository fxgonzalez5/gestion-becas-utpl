export interface Requirement {
  id:            number;
  image:         string;
  name:          string;
  description:   string;
  route:         string;
  required:      boolean;
  status:        boolean | null;
  userLocation?: null;
}
