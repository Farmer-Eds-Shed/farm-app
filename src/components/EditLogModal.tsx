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
import './EditLogModal.css';

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
        date: formatDateForInput(logData.date) // Ensure date is correctly formatted
      });
    }
  }, [logData]);

  const handleSave = () => {
    onSave(editedLog); // Save the edited log data
    onClose(); // Close the edit modal after saving
  };

  const handleChange = (field: string, value: any) => {
    setEditedLog((prevLog: any) => ({ ...prevLog, [field]: value }));
  };

  const formatDateForInput = (date: string) => {
    if (!date) return ''; // Handle null or undefined date
    const dateParts = date.split('/');
    if (dateParts.length !== 3) return ''; // Handle incorrect date format
    const [month, day, year] = dateParts;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Format to YYYY-MM-DD
  };

  console.log("Edited Log:", editedLog);
  console.log("Formatted Date:", editedLog.date);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} >
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