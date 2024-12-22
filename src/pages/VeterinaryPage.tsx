import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';

const VeterinaryPage: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Veterinary</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <>
            <h1>Veterinary Page Content</h1>
        </>
      </IonContent>
    </IonPage>
  );
};

export default VeterinaryPage;
