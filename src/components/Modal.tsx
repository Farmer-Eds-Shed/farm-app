import React from 'react';
import {
    IonModal, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardContent, IonList, IonItem, IonLabel
} from '@ionic/react';
import './Modal.css';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    cellData: any;
    title: string;
}

const Modal: React.FC<CustomModalProps> = ({ isOpen, onClose, cellData, title }) => {
    const renderDetails = (data: any) => {
        if (!data) return null; // Ensure data is not undefined or null

        // Filter out 'data' and 'id' fields
        const filteredKeys = Object.keys(data).filter(key => key !== 'data' && key !== 'id');

        return (
            <IonList>
                {filteredKeys.map((key, index) => (
                    <IonItem key={index}>
                        <IonLabel>{key}</IonLabel>
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

        // Filter out '_links' field
        const filteredKeys = Object.keys(data).filter(key => key !== '_links');

        return (
            <IonList>
                <IonTitle>Additional Details</IonTitle>
                {filteredKeys.map((key, index) => (
                    <IonItem key={index}>
                        <IonLabel>{key}</IonLabel>
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
                        {renderDetails(cellData)}
                        {renderAdditionalData(cellData?.data)}
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonModal>
    );
};

export default Modal;