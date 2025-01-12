import React from 'react';
import { IonModal, IonButton, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const NewEventModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const handleSave = () => {
    // Implement the logic to save the new activity log
    console.log('New Activity Log Created');
    onClose();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create New Activity Log</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Form fields for creating a new log */}
        <IonButton onClick={handleSave}>Save</IonButton>
        <IonButton onClick={onClose}>Cancel</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default NewEventModal;