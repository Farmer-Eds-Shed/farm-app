import React, { useState, useEffect } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { fetchArchivedAnimals } from '../../services/dataService';
import Table from '../../components/Table';
import { livestockColDefs } from '../../constants/ColumnDefinitions';

const SoldTab: React.FC = () => {
    const { data, loading } = useFetchData(fetchArchivedAnimals);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const onSelectionChanged = (event: any) => {
        setSelectedRows(event.api.getSelectedRows());
    };

    useEffect(() => {
        if (selectedRows.length > 0) {
            console.log('Selected Rows:', selectedRows);
        }
    }, [selectedRows]);

    return <Table rowData={data} colDefs={livestockColDefs} loading={loading} onSelectionChanged={onSelectionChanged} />;
};

export default SoldTab;