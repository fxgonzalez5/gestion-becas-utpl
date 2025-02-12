export interface ApplicationScholarship{
  id:         number;
  name:       string;
  economic:   number;
  health:     number;
  academic:   number;
  sports:     number;
  percentage: number;
  score:      number;
  isEditing?: boolean;
}
