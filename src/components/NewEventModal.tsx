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
    IonTextarea,
    IonCard,
    IonCardHeader
  } from '@ionic/react';
import { postActivityLog } from '../services/dataService';

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRows: any[]; // Add selectedRows prop
}

const NewEventModal: React.FC<NewEventModalProps> = ({ isOpen, onClose, selectedRows }) => {
  const [eventType, setEventType] = useState<string>('');
  const [logName, setLogName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const animalAssets = selectedRows.map(row => ({
    type: "asset--animal",
    id: row.id, 
}));

  const handleSave = async () => {
    const log = {
      data: {
        type: eventType,
        attributes: {
          name: logName,
          timestamp: new Date(date).toISOString().replace('.000Z', '+00:00'),
          status: "done", // Assuming status is done
          notes: { value: notes }
        },
        relationships: {
          asset: {
                    data: animalAssets,
          }
        }
      }
    };
    console.log('New Log:', log);
    try {
      await postActivityLog(log);
      console.log('New Activity Log Created');
      onClose();
    } catch (error) {
      console.error('Failed to create log:', error);
    }
  };

  const handleChange = (field: string, value: any) => {
    switch (field) {
      case 'name':
        setLogName(value);
        break;
      case 'notes':
        setNotes(value);
        break;
      case 'date':
        setDate(value);
        break;
      default:
        break;
    }
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
        <IonCard>
                    <IonCardHeader>
                        <IonTitle>Animal Assets</IonTitle>
                    </IonCardHeader>
                    <div>
                        {animalAssets.map(asset => (
                            <div key={asset.id}>
                                {asset.type}: {asset.id}
                            </div>
                        ))}
                    </div>
                </IonCard>
        <IonButton onClick={handleSave}>Save</IonButton>
        <IonButton onClick={onClose}>Cancel</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default NewEventModal;