export interface Location {
  full_address: string;
  coordinates:  Coordinates;
  address:      string;
  country:      string;
  region:       string;
  city:         string;
}

export interface Coordinates {
  longitude: number;
  latitude:  number;
}
