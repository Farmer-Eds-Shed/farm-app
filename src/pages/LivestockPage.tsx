import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';
import { useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { fetchAnimals } from '../services/dataService';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

const LivestockPage: React.FC = () => {

  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const tableData = async () => {
      try {
        const data = await fetchAnimals();
        setRowData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    tableData();
  }, []);
  
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "name", sortable: true, filter: true  },
    { field: "birthdate", sortable: true, filter: true  },
    { field: "tag", sortable: true, filter: true  },
    { field: "notes", sortable: true, filter: true  },

  ]);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Livestock</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            rowData={rowData}
            // @ts-ignore
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={20}
            // @ts-ignore
            loadingOverlayComponentFramework={loading ? 'Loading...' : undefined}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LivestockPage;
