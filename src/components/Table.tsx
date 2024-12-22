// src/components/Table.tsx
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { themeQuartz, iconSetQuartzLight } from 'ag-grid-community';
import './Table.css';

// to use myTheme in an application, pass it to the theme grid option
const myTheme = themeQuartz
	.withPart(iconSetQuartzLight)
	.withParams({
        backgroundColor: "#ffffff",
        borderRadius: 20,
        browserColorScheme: "light",
        columnBorder: false,
        fontFamily: "Arial",
        foregroundColor: "rgb(46, 55, 66)",
        headerBackgroundColor: "#F9FAFB",
        headerFontSize: 20,
        headerFontWeight: 600,
        headerTextColor: "#919191",
        fontSize: 18, 
        oddRowBackgroundColor: "#DCDCDC",
        rowBorder: false,
        sidePanelBorder: false,
        spacing: 8,
        wrapperBorder: true,
        wrapperBorderRadius: 0
    });

ModuleRegistry.registerModules([AllCommunityModule]);

interface TableProps {
  rowData: any[];
  colDefs: any[];
  onSelectionChanged: (event: any) => void;
}

const Table: React.FC<TableProps> = ({ rowData, colDefs, onSelectionChanged }) => {
    
  return (
    
    <div style={{ height: '100%', width: '100%' }}>
      <AgGridReact
        theme={myTheme}
        rowData={rowData}
        columnDefs={colDefs}
        rowSelection={{mode: 'multiRow'}}
        pagination={true}
        paginationPageSize={50}
        onSelectionChanged={onSelectionChanged}
      />
    </div>
    
  );
};

export default Table;