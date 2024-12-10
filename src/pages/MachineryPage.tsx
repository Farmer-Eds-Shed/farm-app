import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonItem, IonButton } from '@ionic/react';
import './Page.css';
//import { fetchData } from '../oauth2/request'
import { Storage } from '@ionic/storage';
import { useEffect, useState} from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { fetchEquipment } from '../services/dataService';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

const EquipmentPage: React.FC = () => {

  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const tableData = async () => {
      try {
        const data = await fetchEquipment();
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
    { field: "manufacturer" },
    { field: "model" },
    { field: "name" },
    { field: "serial" },
    { field: "notes" },

  ]);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Equipment</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      
        <div className="ag-theme-quartz" style={{ height: 500 }} >
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
        
        <IonItem>
        

        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default EquipmentPage;
