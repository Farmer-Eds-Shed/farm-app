import React, { useState } from 'react';
import { 
    IonModal, 
    IonButton, 
    IonContent, 
    IonHeader, 
    IonToolbar, 
    IonTitle,
    IonLabel,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonTextarea
  } from '@ionic/react';

const NewEventModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [eventType, setEventType] = useState<string>('');

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
          <IonLabel position="stacked">Event Type</IonLabel>
          <IonSelect value={eventType} placeholder="Activity" onIonChange={e => setEventType(e.detail.value)}>
            <IonSelectOption value="log--activity">Activity</IonSelectOption>
            <IonSelectOption value="log--observation">Observation</IonSelectOption>
            <IonSelectOption value="log--medical">Medical</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Log Name</IonLabel>
          <IonInput
            onIonChange={(e) => handleChange('name', e.detail.value)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Notes</IonLabel>
          <IonTextarea
            rows={6}
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