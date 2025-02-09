import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import './EditLogModal.css';
import { patchLog } from '../services/dataService';
import { formatDateForInput } from '../services/dateService';

interface EditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  logData: any;
  onSave: (logData: any) => void;
}

const EditLogModal: React.FC<EditLogModalProps> = ({ isOpen, onClose, logData, onSave }) => {
  const [editedLog, setEditedLog] = useState(logData || {});

  useEffect(() => {
    if (logData) {
      setEditedLog({
        ...logData,
        date: formatDateForInput(logData.date),
      });
    }
  }, [logData]);

  const handleSave = async () => {
    try {
      const logDataToPatch = {
        data: {
          id: editedLog.id,
          type: editedLog.type,
          attributes: {
            name: editedLog.name,
            notes: { value: editedLog.notes },
            timestamp: new Date(editedLog.date).toISOString().replace('.000Z', '+00:00'),
            status: editedLog.status,
          },
        },
      };

      await patchLog(logDataToPatch);
      onSave(editedLog);
    } catch (error) {
      console.error('Error saving edited log:', error);
    }
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setEditedLog((prevLog: any) => ({ ...prevLog, [field]: value }));
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <div className="edit-modal">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Log</IonTitle>
            <IonButton slot="end" onClick={onClose}>
              Close
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {logData ? (
            <>
              <IonItem>
                <IonLabel position="stacked">Event</IonLabel>
                <IonInput
                  value={editedLog.name}
                  onIonChange={(e) => handleChange('name', e.detail.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Notes</IonLabel>
                <IonTextarea
                  rows={6}
                  value={editedLog.notes}
                  onIonChange={(e) => handleChange('notes', e.detail.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Date</IonLabel>
                <IonInput
                  type="date"
                  value={editedLog.date}
                  onIonChange={(e) => handleChange('date', e.detail.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Status</IonLabel>
                <IonSelect
                  value={editedLog.status}
                  onIonChange={(e) => handleChange('status', e.detail.value)}
                >
                  <IonSelectOption value="done">Done</IonSelectOption>
                  <IonSelectOption value="pending">Pending</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonButton expand="block" onClick={handleSave}>
                Save
              </IonButton>
            </>
          ) : (
            <p>No log data available to edit.</p>
          )}
        </IonContent>
      </div>
    </IonModal>
  );
};

export default EditLogModal;