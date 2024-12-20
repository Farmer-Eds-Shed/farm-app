import { useEffect, useState } from 'react';
import { fetchActiveAnimals } from '../../services/dataService';
import { ClipLoader } from 'react-spinners'; // Import the spinner
import Table from '../../components/Table'; // Import the new table component
import { dateComparator } from '../../services/dateService';

const ActiveTab: React.FC = () => {
    const [rowData, setRowData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
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
  
    const [colDefs] = useState([
      { field: 'name', sortable: true, filter: true },
      { field: 'sex', sortable: true, filter: true },
      { field: 'birthdate', sortable: true, filter: true, comparator: dateComparator },
      { field: 'tag', sortable: true, filter: true },
      { field: 'notes', sortable: true, filter: true },
    ]);

    return (

  <div style={{ height: '100%', width: '100%' }}>
          {loading ? (
            <div className="spinner-container">
              <div className="spinner-wrapper">
                <ClipLoader className="spinner" color="#696969" loading={loading} size={50} />
              </div>
            </div>
          ) : (
            <Table rowData={rowData} colDefs={colDefs} />
          )}
  </div>

    );
  };


export default ActiveTab;