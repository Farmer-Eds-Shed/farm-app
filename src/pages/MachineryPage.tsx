import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';
import { useEffect, useState} from "react";
import { fetchEquipment } from '../services/dataService';
import Spinner from '../components/Spinner'; // Import the Spinner component
import Table from '../components/Table'; // Import the new table component

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
    { field: "manufacturer", sortable: true, filter: true  },
    { field: "model", sortable: true, filter: true  },
    { field: "name", sortable: true, filter: true  },
    { field: "serial", sortable: true, filter: true  },
    { field: "notes", sortable: true, filter: true  },

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
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <Table rowData={rowData} colDefs={colDefs} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default EquipmentPage;
