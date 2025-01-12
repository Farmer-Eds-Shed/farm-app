import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonRouterLink,
} from '@ionic/react';
import './Page.css';
import Icon from '@mdi/react';
import { appPages } from '../constants/MenuList'; // Import the appPages array



const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
        <IonRow>
            {appPages
              .filter(appPage => appPage.url !== '/home' || location.hash !== '#/home') // Hide "Home" link on HomePage
              .map((appPage, index) => (
                <IonCol size="4" key={index} className="icon-grid-item">
                  <IonRouterLink routerLink={appPage.url}>
                    <div className="icon-container">
                      <Icon path={appPage.mdiIcon} size={5} className="page-icon"/>
                      <p>{appPage.title}</p>
                    </div>
                  </IonRouterLink>
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;