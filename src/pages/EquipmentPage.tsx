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
import LogViewModal from '../components/LogViewModal';
import EditLogModal from '../components/EditLogModal';
import NewEventModal from '../components/NewEventModal';
import './Page.css';

const EquipmentPage: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isShowingSelectedRows, setIsShowingSelectedRows] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState<boolean>(false);
  const [cellData, setCellData] = useState<any>(null);
  const [logData, setLogData] = useState<any>(null);

  const handleBatchLog = () => {
    if (selectedRows.length > 0){ 
      setIsNewEventModalOpen(true);
    }
    else {
      alert("No rows selected");
    }
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
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setCellData(null);
  };

  const handleEditLog = (logData: any) => {
    setLogData(logData);
    setIsEditModalOpen(true); // Open the edit modal
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const saveEditedLog = (editedLog: any) => {
    console.log('Edited Log:', editedLog);
    closeEditModal(); // Close the edit modal after saving
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
          <LogViewModal 
            isOpen={isViewModalOpen} 
            onClose={closeViewModal} 
            cellData={cellData} 
            title={`Equipment: ${cellData?.tag ?? 'Unknown'}`}
            fetchFunctions={fetchFunctions} 
            onEditLog={handleEditLog} // Pass the handler
          />
          <EditLogModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            logData={logData} // Pass the correct log data
            onSave={saveEditedLog}
          />
          <NewEventModal 
            isOpen={isNewEventModalOpen} 
            onClose={() => setIsNewEventModalOpen(false)}
            selectedRows={selectedRows}
            assetType="equipment" // Pass assetType as equipment
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EquipmentPage;