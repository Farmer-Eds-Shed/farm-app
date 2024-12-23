import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonButton,
} from '@ionic/react';
import { useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import { fetchActiveAnimals, fetchPurchasedAnimals, fetchSoldAnimals, fetchDeadAnimals } from '../services/dataService';
import Table from '../components/Table';
import { livestockColDefs } from '../constants/ColumnDefinitions';
import Modal from '../components/Modal';
import './Page.css'; 

const LivestockPage: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<'purchased' | 'active' | 'sold' | 'mortality'>('active');
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

  const dataFetchers = {
    active: fetchActiveAnimals,
    purchased: fetchPurchasedAnimals,
    sold: fetchSoldAnimals,
    mortality: fetchDeadAnimals,
  };

  const { data, loading } = useFetchData(dataFetchers[selectedTable]);

  const displayedRows = isShowingSelectedRows ? selectedRows : data;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handleBatchLog}>Batch Log</IonButton>
            <IonButton onClick={handleShowSelectedRows}>
              {isShowingSelectedRows ? 'Show All Rows' : 'Show Only Selected Rows'}
            </IonButton>
          </IonButtons>
          <div className="toolbar-center">
            <select
              className="custom-dropdown"
              value={selectedTable}
              onChange={e => setSelectedTable(e.target.value as 'purchased' | 'active' | 'sold' | 'mortality')}
            >
              <option value="active">Active</option>
              <option value="purchased">Purchased</option>
              <option value="sold">Sold</option>
              <option value="mortality">Mortality</option>
            </select>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ height: '100%', width: '100%' }}>
          <Table
            rowData={displayedRows}
            colDefs={livestockColDefs}
            loading={loading}
            onSelectionChanged={onSelectionChanged}
            onCellClicked={handleCellClick}
            selectedRows={selectedRows}  // Pass selected rows to the table
            isExternalFilterPresent={isShowingSelectedRows}
          />
          <Modal isOpen={isModalOpen} onClose={closeModal} cellData={cellData} title={`Animal: ${cellData?.tag ?? 'Unknown'}`}/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LivestockPage;