import React from 'react';
import { IonModal, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    cellData: any;
}

const Modal: React.FC<CustomModalProps> = ({ isOpen, onClose, cellData }) => {
    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Events</IonTitle>
                    <IonButton slot="end" onClick={onClose}>Close</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>{cellData?.tag || 'No Title'}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <pre>{JSON.stringify(cellData, null, 2)}</pre> {/* Display cell data */}
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonModal>
    );
};

export default Modal;