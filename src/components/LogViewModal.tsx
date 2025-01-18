import React, { useMemo, useState, useEffect } from 'react';
import {
    IonModal, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardContent, IonList, IonItem, IonLabel, IonAlert
} from '@ionic/react';
import './LogViewModal.css';
import Table from './Table';
import useFetchData from '../hooks/useFetchData';
import { activityLogColDefs } from '../constants/ColumnDefinitions';
import { deleteLogs } from '../services/subRequests';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    cellData: any;
    title: string;
    fetchFunctions: Array<(id: string) => Promise<any>>;
    onEditLog: (data: any) => void;
}

const LogViewModal: React.FC<CustomModalProps> = ({ isOpen, onClose, cellData, title, fetchFunctions, onEditLog }) => {
    const fetchDataFunctions = useMemo(() => {
        if (cellData && cellData.id) {
            return fetchFunctions.map(fn => () => fn(cellData.id));
        }
        return [];
    }, [cellData, fetchFunctions]);

    const [logs, setLogs] = useState<any[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const { data, loading } = useFetchData(fetchDataFunctions);

    useEffect(() => {
        setLogs(data);
    }, [data]);

    const handleLogEdit = (logData: any) => {
        onEditLog(logData);
    };

    const handleLogDelete = async () => {
        try {
            await deleteLogs(selectedRows);
            setSelectedRows([]);
            // Re-fetch logs by updating fetch data functions
            const newFetchDataFunctions = fetchFunctions.map(fn => () => fn(cellData.id));
            const fetchedLogs = await Promise.all(newFetchDataFunctions.map(fn => fn()));
            setLogs(fetchedLogs.flat());
        } catch (error) {
            console.error('Error deleting logs:', error);
        }
    };

    const handleSelectionChanged = (event: any) => {
        setSelectedRows(event.api.getSelectedRows());
        console.log('Selected Rows:', event.api.getSelectedRows());
    };

    const formatLabel = (label: string) => {
        return label.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    const renderDetails = (data: any) => {
        if (!data) return null;
        const filteredKeys = Object.keys(data).filter(key => key !== 'data' && key !== 'id');

        return (
            <IonList>
                {filteredKeys.map((key, index) => (
                    <IonItem key={index}>
                        <IonLabel>{formatLabel(key)}</IonLabel>
                        <div>
                            {typeof data[key] === 'object' && data[key] !== null
                                ? Array.isArray(data[key])
                                    ? data[key].map((item: any, idx: number) => (
                                          <div key={idx}>{JSON.stringify(item)}</div>
                                      ))
                                    : JSON.stringify(data[key])
                                : data[key]}
                        </div>
                    </IonItem>
                ))}
            </IonList>
        );
    };

    const renderAdditionalData = (data: any) => {
        if (!data) return null;
        const filteredKeys = Object.keys(data).filter(key => key !== '_links');

        return (
            <IonList>
                <IonTitle>Additional Details</IonTitle>
                {filteredKeys.map((key, index) => (
                    <IonItem key={index}>
                        <IonLabel>{formatLabel(key)}</IonLabel>
                        <div>
                            {typeof data[key] === 'object' && data[key] !== null
                                ? Array.isArray(data[key])
                                    ? data[key].map((item: any, idx: number) => (
                                          <div key={idx}>{JSON.stringify(item)}</div>
                                      ))
                                    : JSON.stringify(data[key])
                                : data[key]}
                        </div>
                    </IonItem>
                ))}
            </IonList>
        );
    };

    return (
        <>
            <IonModal isOpen={isOpen} onDidDismiss={onClose} className="custom-modal">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Details</IonTitle>
                        <IonButton slot="end" onClick={onClose}>Close</IonButton>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard>
                        <IonCardHeader>
                            <IonTitle>{title}</IonTitle>
                        </IonCardHeader>
                        <IonCardContent className="custom-modal-content">
                            <div className="modal-content">
                                <div className="modal-column">
                                    {renderDetails(cellData)}
                                    {renderAdditionalData(cellData?.data)}
                                </div>
                                <div className="modal-column">
                                    <Table 
                                        rowData={logs} 
                                        colDefs={activityLogColDefs}
                                        loading={loading} 
                                        onCellClicked={handleLogEdit} 
                                        onSelectionChanged={handleSelectionChanged}
                                        isExternalFilterPresent={false} 
                                    />
                                    <IonButton onClick={() => setShowConfirm(true)}>Delete Log</IonButton>
                                </div>
                            </div>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonModal>
            <IonAlert
                isOpen={showConfirm}
                onDidDismiss={() => setShowConfirm(false)}
                header={'Confirm Delete'}
                message={'Are you sure you want to delete the selected logs?'}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            setShowConfirm(false);
                        }
                    },
                    {
                        text: 'Delete',
                        handler: () => {
                            setShowConfirm(false);
                            handleLogDelete();
                        }
                    }
                ]}
            />
        </>
    );
};

export default LogViewModal;