import React, { useRef, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { themeQuartz, iconSetQuartzLight } from 'ag-grid-community';
import './Table.css';

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
  loading: boolean;
  onSelectionChanged?: (event: any) => void;
  onCellClicked: (cellData: any) => void;
  selectedRows?: any[];
  isExternalFilterPresent: boolean;
}

const Table: React.FC<TableProps> = ({
  rowData,
  colDefs,
  loading,
  onSelectionChanged,
  onCellClicked,
  selectedRows = [],
  isExternalFilterPresent,
}) => {
  const gridRef = useRef<any>(null);

  useEffect(() => {
    if (gridRef.current && gridRef.current.api && selectedRows) {
      gridRef.current.api.forEachNode((node: any) => {
        if (selectedRows.some((row) => row.id === node.data.id)) {
          node.setSelected(true);
        }
      });
    }
  }, [selectedRows]);

  const isExternalFilterPresentFunc = () => {
    return isExternalFilterPresent;
  };

  const doesExternalFilterPassFunc = (node: any) => {
    return selectedRows.some((row) => row.id === node.data.id);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner-wrapper">
            <ClipLoader className="spinner" color="#696969" loading={loading} size={50} />
          </div>
        </div>
      ) : (
        <AgGridReact
          ref={gridRef}
          theme={myTheme}
          rowData={rowData}
          columnDefs={colDefs}
          rowSelection={{ mode: 'multiRow' }}
          pagination={true}
          paginationPageSize={50}
          onSelectionChanged={onSelectionChanged}
          onCellClicked={(params) => onCellClicked(params.data)}
          isExternalFilterPresent={isExternalFilterPresentFunc}
          doesExternalFilterPass={doesExternalFilterPassFunc}
        />
      )}
    </div>
  );
};

export default Table;