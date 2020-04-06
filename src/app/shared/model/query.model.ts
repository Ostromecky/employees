import { SortDirection } from '@angular/material/sort';

export interface Query {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortDirection;
  filter?: object;
}
