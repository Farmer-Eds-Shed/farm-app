import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';

const LivestockPage: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Livestock</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <>
            <h1>Livestock Page Content</h1>
        </>
      </IonContent>
    </IonPage>
  );
};

export default LivestockPage;
