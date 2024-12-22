import React from 'react';
import { ClipLoader } from 'react-spinners';
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
    loading: boolean;
    onSelectionChanged?: (event: any) => void;
    onCellClicked: (cellData: any) => void;
}

const Table: React.FC<TableProps> = ({ rowData, colDefs, loading, onSelectionChanged, onCellClicked }) => {
  

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
                    theme={myTheme}
					rowData={rowData}
					columnDefs={colDefs}
					rowSelection={{mode: 'multiRow'}}
					pagination={true}
					paginationPageSize={50}
					onSelectionChanged={onSelectionChanged}
          onCellClicked={params => onCellClicked(params.data)} // Pass cell data to the handler
                />
            )}
        </div>
    );
};

export default Table;