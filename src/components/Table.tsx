//Table.tsx

import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

interface TableProps {
  rowData: any[];
  colDefs: any[];
}

const Table: React.FC<TableProps> = ({ rowData, colDefs }) => {
  return (
    <div className="ag-theme-material" style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={20}
        rowSelection="multiple"
      />
    </div>
  );
};

export default Table;