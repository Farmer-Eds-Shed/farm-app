import React from 'react';
import { 
    IonModal, 
    IonButton, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle,
    IonLabel,
    IonItem,
    IonInput
  } from '@ionic/react';

const NewEventModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const handleSave = () => {
    // Implement the logic to save the new activity log
    console.log('New Activity Log Created');
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    // Implement the logic to update the new activity log
    
    console.log('Field:', field, 'Value:', value);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create New Activity Log</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonItem>
                <IonLabel position="stacked">Event</IonLabel>
                <IonInput
                  onIonChange={(e) => handleChange('name', e.detail.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Notes</IonLabel>
                <IonInput
                  onIonChange={(e) => handleChange('notes', e.detail.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Date</IonLabel>
                <IonInput
                  type="date"
                  onIonChange={(e) => handleChange('date', e.detail.value)}
                />
              </IonItem>
        <IonButton onClick={handleSave}>Save</IonButton>
        <IonButton onClick={onClose}>Cancel</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default NewEventModal;