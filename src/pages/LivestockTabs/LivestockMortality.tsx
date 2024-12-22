import React, { useState, useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { fetchDeadAnimals } from '../../services/dataService';
import Table from '../../components/Table';
import { livestockColDefs } from '../../constants/ColumnDefinitions';
import Modal from '../../components/Modal';

const MortalityTab: React.FC = () => {
    const { data, loading } = useFetchData(fetchDeadAnimals);
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
      <div style={{ height: '100%', width: '100%' }}>
          <Table
              rowData={data}
              colDefs={livestockColDefs}
              loading={loading}
              onSelectionChanged={onSelectionChanged}
              onCellClicked={handleCellClick}
          />
          <Modal isOpen={isModalOpen} onClose={closeModal} cellData={cellData} />
      </div>
  );
};


export default MortalityTab;