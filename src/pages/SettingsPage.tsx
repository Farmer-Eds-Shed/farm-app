import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Page.css';
import { useEffect, useState} from "react";
import { Storage } from '@ionic/storage';
import {LoginForm} from '../components/LoginForm'


//form variables
const SettingsPage: React.FC = () => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const setupStorage = async () => {
      const newStore = new Storage();
      const store = await newStore.create();
 
      const saveUrl = (await store.get('url'));
      setUrl(saveUrl || "https://");
    }
    setupStorage()
  }, [])

  
  return url ? (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div id = "container">
          <h2>farmOS Login</h2>
          <LoginForm farmUrl={url}/>
          </div>
        </IonContent>
    </IonPage>
  ) : <>Loading....</>;
};



export default SettingsPage;
