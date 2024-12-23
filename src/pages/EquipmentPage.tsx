import React, { useState, useEffect } from 'react';
import useFetchData from '../hooks/useFetchData';
import { fetchEquipment } from '../services/dataService';
import Table from '../components/Table';
import { equipmentColDefs } from '../constants/ColumnDefinitions';
import Modal from '../components/Modal';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';

const EquipmentPage: React.FC = () => {
  const { data, loading } = useFetchData(fetchEquipment);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cellData, setCellData] = useState<any>(null);

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
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Equipment</IonTitle>
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
          />
          <Modal isOpen={isModalOpen} onClose={closeModal} cellData={cellData} title={`Equipment: ${cellData?.name ?? 'Unknown'}`}/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EquipmentPage;