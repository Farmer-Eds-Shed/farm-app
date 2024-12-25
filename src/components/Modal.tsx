import React, { useEffect, useState } from 'react';
import {
    IonModal, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardContent, IonList, IonItem, IonLabel
} from '@ionic/react';
import './Modal.css';
import Table from './Table';
import { fetchActivityLogs } from '../services/dataService';
import { activityLogColDefs } from '../constants/ColumnDefinitions';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    cellData: any;
    title: string;
}

const Modal: React.FC<CustomModalProps> = ({ isOpen, onClose, cellData, title }) => {
    const [activityLogs, setActivityLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (isOpen && cellData && cellData.id) {
            setLoading(true);
            fetchActivityLogs(cellData.id).then(logs => {
                setActivityLogs(logs);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        }
    }, [isOpen, cellData]);

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
                                    rowData={activityLogs} 
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