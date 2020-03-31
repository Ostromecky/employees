import { SortDirection } from '@angular/material/sort';

export interface Query {
  page?: number;
  limit?: number;
  activeSort?: string;
  order?: SortDirection;
  filter?: object;
}
