import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import './Page.css';
import { useEffect, useState } from "react";
import { Storage } from '@ionic/storage';
import { LoginForm } from '../components/LoginForm';

const SettingsPage: React.FC = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const setupStorage = async () => {
      try {
        const newStore = new Storage();
        const store = await newStore.create();
        const savedUrl = await store.get('url');
        setUrl(savedUrl || "https://");
      } catch (err) {
        console.error("Failed to set up storage:", err);
        setError("Failed to load settings. Please try again.");
      }
    };
    setupStorage();
  }, []);

  return (
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
        <div id="container">
          <h2>farmOS Login</h2>
          {url ? <LoginForm farmUrl={url} /> : "Loading..."}
        </div>
        {error && (
          <IonToast
            isOpen={!!error}
            message={error}
            duration={2000}
            color="danger"
            onDidDismiss={() => setError(null)}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;