import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { useState } from 'react';
import { eye, eyeOff } from 'ionicons/icons';
import useFetchData from '../hooks/useFetchData';
import { fetchEquipment, fetchEquipmentLogs, fetchMaintenanceLogs } from '../services/dataService';
import { handleExportCSV } from '../services/exportService';
import Table from '../components/Table';
import { equipmentColDefs } from '../constants/ColumnDefinitions';
import Modal from '../components/LogViewModal';
import './Page.css';

const EquipmentPage: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isShowingSelectedRows, setIsShowingSelectedRows] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cellData, setCellData] = useState<any>(null);

  const handleBatchLog = () => {
    console.log('Selected Cells:', selectedRows);
  };

  const handleShowSelectedRows = () => {
    setIsShowingSelectedRows(!isShowingSelectedRows);
  };

  const onSelectionChanged = (event: any) => {
    setSelectedRows(event.api.getSelectedRows());
  };

  const handleCellClick = (data: any) => {
    setCellData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCellData(null);
  };

  const handleEditLog = (data: any) => {
    // Implement your edit log logic here
    console.log("Editing log:", data);
  };

  const { data, loading } = useFetchData(fetchEquipment);

  // Define the log fetching functions
  const fetchFunctions = [
    (id: string) => fetchEquipmentLogs(id),
    (id: string) => fetchMaintenanceLogs(id),
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="toolbar-buttons-container">
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonButtons slot="start">
              <IonButton onClick={handleShowSelectedRows}>
                <IonIcon className='toolbar-icons' icon={isShowingSelectedRows ? eyeOff : eye} slot="icon-only" />
              </IonButton>
              <IonButton className='toolbar-buttons' onClick={handleBatchLog}>
                New Event
              </IonButton>
              <IonButton className='toolbar-buttons' onClick={() => handleExportCSV(selectedRows, 'equipment')}>
                CSV Export
              </IonButton>
            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ height: '100%', width: '100%' }}>
          <Table
            rowData={data}
            colDefs={equipmentColDefs}
            loading={loading}
            onSelectionChanged={onSelectionChanged}
            onCellClicked={handleCellClick}
            selectedRows={selectedRows}
            isExternalFilterPresent={isShowingSelectedRows}
          />
          <Modal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            cellData={cellData} 
            title={`Equipment: ${cellData?.tag ?? 'Unknown'}`}
            fetchFunctions={fetchFunctions}
            onEditLog={handleEditLog} // Add the missing property here
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EquipmentPage;