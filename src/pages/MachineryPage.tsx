import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonItem, IonButton } from '@ionic/react';
import './Page.css';
import { fetchData } from '../oauth2/request'
import { Storage } from '@ionic/storage';



const test = async () => {
  const store = new Storage();
  await store.create();
  console.log(fetchData('asset/equipment'));
  
}

 const EquipmentPage: React.FC = () => {

  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Equipment</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      
            <h1>Equipment Page Content</h1>
        
        <IonItem>
        <IonButton onClick={() => { test();}}>Test</IonButton>

        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default EquipmentPage;
