import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonItem, IonButton } from '@ionic/react';
import './Page.css';
import { fetchData } from '../oauth2/request'
import { Storage } from '@ionic/storage';
import { useState} from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid



const test = async () => {
  const store = new Storage();
  await store.create();
  console.log(fetchData('asset/equipment'));
  
}


 const EquipmentPage: React.FC = () => {

  const [rowData, setRowData] = useState([
    { manufacturer: "McCormick", model: "CX95", identification: 64950 },
    { manufacturer: "Massey Ferguson", model: "135", identification: 33850 },
    { manufacturer: "Massey Ferguson", model: "205", identification: 29600 },
  ]);
  
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "manufacturer" },
    { field: "model" },
    { field: "identification" }
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
          />
        </div>
        
        <IonItem>
        <IonButton onClick={() => { test();}}>Test</IonButton>

        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default EquipmentPage;
