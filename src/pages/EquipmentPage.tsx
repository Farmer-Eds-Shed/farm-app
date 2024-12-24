import React, { useState, useEffect } from 'react';
import useFetchData from '../hooks/useFetchData';
import { fetchEquipment } from '../services/dataService';
import { handleExportCSV } from '../services/exportService';
import Table from '../components/Table';
import { equipmentColDefs } from '../constants/ColumnDefinitions';
import Modal from '../components/Modal';
import { eye, eyeOff } from 'ionicons/icons';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import './Page.css';

const EquipmentPage: React.FC = () => {
  const { data, loading } = useFetchData(fetchEquipment);
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

  useEffect(() => {
    if (selectedRows.length > 0) {
      console.log('Selected Rows:', selectedRows);
    }
  }, [selectedRows]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <div className="toolbar-buttons-container">
        <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButton onClick={handleShowSelectedRows}>
                <IonIcon className='toolbar-icons' icon={isShowingSelectedRows ? eyeOff : eye} slot="icon-only" />
              </IonButton>
              <IonButton className='toolbar-buttons' onClick={handleBatchLog}>
                New Event
              </IonButton>
              <IonButton className='toolbar-buttons' onClick={() => handleExportCSV(selectedRows, "null")}>
                CSV Export
              </IonButton>
              <div className="toolbar-center">
                
              </div>
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
            selectedRows={selectedRows}  // Pass selected rows to the table
            isExternalFilterPresent={isShowingSelectedRows}
          />
          <Modal isOpen={isModalOpen} onClose={closeModal} cellData={cellData} title={`Equipment: ${cellData?.name ?? 'Unknown'}`}/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EquipmentPage;