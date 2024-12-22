import { useEffect, useState } from 'react';
import { fetchActiveAnimals } from '../../services/dataService';
import { ClipLoader } from 'react-spinners';
import Table from '../../components/Table';
import { livestockColDefs } from '../../constants/ColumnDefinitions';

const ActiveTab: React.FC = () => {
    const [rowData, setRowData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const colDefs = livestockColDefs;
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    useEffect(() => {
      const tableData = async () => {
        try {
          const data = await fetchActiveAnimals();
          setRowData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      tableData();
    }, []);

    const onSelectionChanged = (event:any) => {
      setSelectedRows(event.api.getSelectedRows());
    };
  
    useEffect(() => {
      if (selectedRows.length > 0) {
        console.log('Selected Rows:', selectedRows);
      }
    }, [selectedRows]);

    return (
      <div style={{ height: '100%', width: '100%' }}>
        {loading ? (
          <div className="spinner-container">
            <div className="spinner-wrapper">
              <ClipLoader className="spinner" color="#696969" loading={loading} size={50} />
            </div>
          </div>
        ) : (
          <Table rowData={rowData} colDefs={colDefs} onSelectionChanged={onSelectionChanged} />
        )}
      </div>
    );
};

export default ActiveTab;