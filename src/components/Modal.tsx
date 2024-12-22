import React from 'react';
import {
    IonModal, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel
} from '@ionic/react';
import './Modal.css';

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    cellData: any;
}

const Modal: React.FC<CustomModalProps> = ({ isOpen, onClose, cellData }) => {
    const renderAnimalDetails = (data: any) => {
        return (
            <IonList>
                <IonItem>
                    <IonLabel>Name</IonLabel>
                    <div>{data?.name}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Sex</IonLabel>
                    <div>{data?.sex}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Birthdate</IonLabel>
                    <div>{data?.birthdate}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Notes</IonLabel>
                    <div>{data?.notes || 'N/A'}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Tag</IonLabel>
                    <div>{data?.tag}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Status</IonLabel>
                    <div>{data?.status}</div>
                </IonItem>
            </IonList>
        );
    };

    const renderAdditionalData = (data: any) => {
        if (!data) return null;

        return (
            <IonList>
                <IonTitle>ICBF Details</IonTitle>
                <IonItem>
                    <IonLabel>Animal ID</IonLabel>
                    <div>{data.animal_id}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Sex</IonLabel>
                    <div>{data.sex}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Birth Date</IonLabel>
                    <div>{data.birth_date}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Dam Number</IonLabel>
                    <div>{data.dam_number}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Dam Freeze Brand</IonLabel>
                    <div>{data.dam_freeze_brand}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Sire Number</IonLabel>
                    <div>{data.sire_number}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Sire Name</IonLabel>
                    <div>{data.sire_name}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Arrive Date</IonLabel>
                    <div>{data.arrive_date}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Contract Rearing</IonLabel>
                    <div>{data.contract_rearing}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Total Movements</IonLabel>
                    <div>{data.total_movements}</div>
                </IonItem>
                <IonItem>
                    <IonLabel>Breed</IonLabel>
                    <div>
                        {data.breed.map((b: any, index: number) => (
                            <div key={index}>{b.code}: {b.percent}%</div>
                        ))}
                    </div>
                </IonItem>

            </IonList>
        );
    };

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className="custom-modal" >
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Details</IonTitle>
                    <IonButton slot="end" onClick={onClose}>Close</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonTitle>Animal: {cellData?.tag || 'No Title'}</IonTitle>
                    </IonCardHeader>
                    <IonCardContent className="custom-modal-content">
                        {renderAnimalDetails(cellData)}
                        {renderAdditionalData(cellData?.data)}
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonModal>
    );
};

export default Modal;