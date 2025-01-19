import React, { useState, useEffect } from 'react';
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
  IonCardHeader,
} from '@ionic/react';
import { postLog } from '../services/dataService';

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRows: any[];
}

const NewEventModal: React.FC<NewEventModalProps> = ({ isOpen, onClose, selectedRows }) => {
  const [eventType, setEventType] = useState<string>('');
  const [logName, setLogName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const animalAssets = selectedRows.map(row => ({
    type: "asset--animal",
    id: row.id,
  }));

  useEffect(() => {
    if (!isOpen) {
      setEventType('');
      setLogName('');
      setNotes('');
      setDate('');
      setErrorMessage('');
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!eventType || !logName || !date) {
      setErrorMessage('Event Type, Log Name, and Date are required fields.');
      return;
    }

    const log = {
      data: {
        type: eventType,
        attributes: {
          name: logName,
          timestamp: new Date(date).toISOString().replace('.000Z', '+00:00'),
          status: "done",
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
      await postLog(log);
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
        {errorMessage && <div style={{ color: 'red', padding: '10px' }}>{errorMessage}</div>}
        <IonItem>
          <IonLabel position="stacked">Event Type</IonLabel>
          <IonSelect value={eventType} placeholder="Select event type" onIonChange={e => setEventType(e.detail.value)}>
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
            {selectedRows.map(animal => (
              <div key={animal.id}>
                {animal.tag} - {animal.sex}
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