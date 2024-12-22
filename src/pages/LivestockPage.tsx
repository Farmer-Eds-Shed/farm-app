import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';
import { useEffect, useState } from 'react';
import { fetchAnimals } from '../services/dataService';
import { ClipLoader } from 'react-spinners'; // Import the spinner
import Table from '../components/Table'; // Import the new table component

const LivestockPage: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const tableData = async () => {
      try {
        const data = await fetchAnimals();
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
    {
      headerCheckboxSelection: true, // Display checkbox in the header
      checkboxSelection: true, // Display checkboxes in the rows
      width: 50, // Set the width of the checkbox column
    },
    { field: 'name', sortable: true, filter: true },
    { field: 'birthdate', sortable: true, filter: true },
    { field: 'tag', sortable: true, filter: true },
    { field: 'notes', sortable: true, filter: true },
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
        {loading ? (
          <div className="spinner-container">
            <div className="spinner-wrapper">
              <ClipLoader className="spinner" color="#36d7b7" loading={loading} size={50} />
            </div>
          </div>
        ) : (
          <Table rowData={rowData} colDefs={colDefs} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default LivestockPage;