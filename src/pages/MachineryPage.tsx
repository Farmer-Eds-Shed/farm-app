import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonItem, IonButton } from '@ionic/react';
import './Page.css';
import { fetchData } from '../oauth2/request'
import { Storage } from '@ionic/storage';

const store = new Storage();
await store.create();

const test = () => {
console.log(fetchData('asset/equipment'));
}

const MachineryPage: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start">
            <IonMenuButton />
          </IonButton >
          <IonTitle>Machinery</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      
            <h1>Machinery Page Content</h1>
        
        <IonItem>
              <IonButton onClick={() => { test();}}/>Test

        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default MachineryPage;
