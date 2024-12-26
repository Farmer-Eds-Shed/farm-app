import React, { useMemo } from 'react';
import {
    IonModal, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardContent, IonList, IonItem, IonLabel
} from '@ionic/react';
import './Modal.css';
import Table from './Table';
import useFetchData from '../hooks/useFetchData';
import { fetchActivityLogs, fetchBirthLogs, fetchObservationLogs, fetchMedicalLogs, fetchHarvestLogs } from '../services/dataService';
import { activityLogColDefs } from '../constants/ColumnDefinitions';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    cellData: any;
    title: string;
}

const Modal: React.FC<CustomModalProps> = ({ isOpen, onClose, cellData, title }) => {
    const fetchDataFunctions = useMemo(() => {
        if (cellData && cellData.id) {
            return [
                () => fetchActivityLogs(cellData.id),
                () => fetchBirthLogs(cellData.id),
                () => fetchObservationLogs(cellData.id),
                () => fetchMedicalLogs(cellData.id),
                () => fetchHarvestLogs(cellData.id),

            ];
        }
        return [];
    }, [cellData]);

    const { data: logs, loading } = useFetchData(fetchDataFunctions);

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
                                    onCellClicked={(cellData) => { /* Handle cell click */ }} 
                                    isExternalFilterPresent={false} 
                                />
                            </div>
                        </div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonModal>
    );
};

export default Modal;