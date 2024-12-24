// src/constants/columnDefinitions.ts
import { dateComparator, filterParams } from '../services/dateService';

export const livestockColDefs = [
  { field: 'name', sortable: true, filter: true },
  { field: 'sex', sortable: true, filter: true },
  { field: 'birthdate', sortable: true, filter: "agDateColumnFilter", filterParams: filterParams, comparator: dateComparator },
  { field: 'tag', sortable: true, filter: true },
  { field: 'status', sortable: true, filter: true },
];

export const equipmentColDefs = [
  { field: "manufacturer", sortable: true, filter: true  },
  { field: "model", sortable: true, filter: true  },
  { field: "name", sortable: true, filter: true  },
  { field: "serial", sortable: true, filter: true  },
  { field: "notes", sortable: true, filter: true  },

];