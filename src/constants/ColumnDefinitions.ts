// src/constants/columnDefinitions.ts
import { dateComparator } from '../services/dateService';

export const livestockColDefs = [
  { field: 'name', sortable: true, filter: true },
  { field: 'sex', sortable: true, filter: true },
  { field: 'birthdate', sortable: true, filter: true, comparator: dateComparator },
  { field: 'tag', sortable: true, filter: true },
  { field: 'notes', sortable: true, filter: true },
];