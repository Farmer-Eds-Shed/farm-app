import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';

const DiaryPage: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Diary</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <>
            <h1>Diary Page Content</h1>
        </>
      </IonContent>
    </IonPage>
  );
};

export default DiaryPage;
