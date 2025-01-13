import React, { useState, useMemo } from 'react';
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
import { eye, eyeOff } from 'ionicons/icons';
import useFetchData from '../hooks/useFetchData';
import {
  fetchActiveAnimals,
  fetchPurchasedAnimals,
  fetchSoldAnimals,
  fetchDeadAnimals,
  fetchActivityLogs,
  fetchBirthLogs,
  fetchObservationLogs,
  fetchMedicalLogs,
  fetchHarvestLogs
} from '../services/dataService';
import { handleExportCSV } from '../services/exportService';
import Table from '../components/Table';
import { livestockColDefs } from '../constants/ColumnDefinitions';
import LogViewModal from '../components/LogViewModal';
import EditLogModal from '../components/EditLogModal';
import NewEventModal from '../components/NewEventModal';
import './Page.css';

const LivestockPage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<'purchased' | 'active' | 'sold' | 'mortality'>('active');
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isShowingSelectedRows, setIsShowingSelectedRows] = useState<boolean>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState<boolean>(false);
  const [cellData, setCellData] = useState<any>(null);
  const [logData, setLogData] = useState<any>(null);

  const handleBatchLog = () => {
    setIsNewEventModalOpen(true);
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
    // Implement the logic to save the edited log
    console.log('Edited Log:', editedLog);
    closeEditModal(); // Close the edit modal after saving
  };

  const dataFetchers = useMemo(() => {
    return {
      active: fetchActiveAnimals,
      purchased: fetchPurchasedAnimals,
      sold: fetchSoldAnimals,
      mortality: fetchDeadAnimals,
    };
  }, []);

  const { data, loading } = useFetchData(dataFetchers[selectedTable]);

  const fetchFunctions = [
    fetchActivityLogs,
    fetchBirthLogs,
    fetchObservationLogs,
    fetchMedicalLogs,
    fetchHarvestLogs
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
              <IonButton className='toolbar-buttons' onClick={() => handleExportCSV(selectedRows, selectedTable)}>
                CSV Export
              </IonButton>
            </IonButtons>
            <div className="toolbar-center">
              <select
                className="custom-dropdown"
                value={selectedTable}
                onChange={e => setSelectedTable(e.target.value as 'purchased' | 'active' | 'sold' | 'mortality')}
              >
                <option value="active">Animals in Herd</option>
                <option value="purchased">Animals Purchased</option>
                <option value="sold">Animals Sold</option>
                <option value="mortality">Mortality Report</option>
              </select>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ height: '100%', width: '100%' }}>
          <Table
            rowData={data}
            colDefs={livestockColDefs}
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
            title={`Animal: ${cellData?.tag ?? 'Unknown'}`}
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
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LivestockPage;