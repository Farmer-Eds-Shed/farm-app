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
  fetcAllIncompleteLogs,
  fetcAllCompleteLogs
} from '../services/dataService';
import { handleExportCSV } from '../services/exportService';
import Table from '../components/Table';
import { activityLogColDefs } from '../constants/ColumnDefinitions';
import EditLogModal from '../components/EditLogModal';
import './Page.css';

const DiaryPage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<'done' | 'pending'>('done');
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isShowingSelectedRows, setIsShowingSelectedRows] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [logData, setLogData] = useState<any>(null);


  const handleShowSelectedRows = () => {
    setIsShowingSelectedRows(!isShowingSelectedRows);
  };

  const onSelectionChanged = (event: any) => {
    setSelectedRows(event.api.getSelectedRows());
  };

  const handleCellClick = (data: any) => {
    setLogData(data);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const saveEditedLog = (editedLog: any) => {
    console.log('Edited Log:', editedLog);
    closeEditModal(); // Close the edit modal after saving
  };

  const dataFetchers = useMemo(() => {
    return {
      done: fetcAllCompleteLogs,
      pending: fetcAllIncompleteLogs,
    };
  }, []);

  const { data, loading } = useFetchData(dataFetchers[selectedTable]);

  const fetchFunctions = [
    fetcAllIncompleteLogs
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
              <IonButton className='toolbar-buttons' onClick={() => handleExportCSV(selectedRows, selectedTable)}>
                CSV Export
              </IonButton>
            </IonButtons>
            <div className="toolbar-center">
              <select
                className="custom-dropdown"
                value={selectedTable}
                onChange={e => setSelectedTable(e.target.value as 'done' | 'pending')}
              >
                <option value="done">Complete Logs</option>
                <option value="pending">Incomplete</option>
              </select>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ height: '100%', width: '100%' }}>
          <Table
            rowData={data}
            colDefs={activityLogColDefs}
            loading={loading}
            onSelectionChanged={onSelectionChanged}
            onCellClicked={handleCellClick}
            selectedRows={selectedRows}
            isExternalFilterPresent={isShowingSelectedRows}
          />
          <EditLogModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            logData={logData} // Pass the correct log data
            onSave={saveEditedLog}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DiaryPage;