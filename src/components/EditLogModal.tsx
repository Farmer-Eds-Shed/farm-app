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
  IonLabel
} from '@ionic/react';
import './EditLogModal.css'; // Ensure this file includes the CSS class

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
      setEditedLog(logData);
      console.log('Log data:', logData);
    }
  }, [logData]);

  const handleSave = () => {
    onSave(editedLog);
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setEditedLog((prevLog: any) => ({ ...prevLog, [field]: value }));
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="custom-modal">
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
              <IonInput
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
            {/* Add more fields as necessary */}
            <IonButton expand="block" onClick={handleSave}>
              Save
            </IonButton>
          </>
        ) : (
          <p>No log data available to edit.</p>
        )}
      </IonContent>
    </IonModal>
  );
};

export default EditLogModal;