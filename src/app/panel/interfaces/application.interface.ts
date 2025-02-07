export interface Application {
  application_id:   number;
  scholarship_id:   number;
  scholarship_type: string;
  year:             number;
  period:           string;
  modality:         string;
  application_date: Date;
  status:           string;
  observations:     null | string;
}
