import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { bookmarkOutline } from 'ionicons/icons';
import './Menu.css';

import Icon from '@mdi/react';
import { mdiHomeSilo, mdiCow, mdiSilo, mdiBarley, mdiTractor, mdiNotebook, mdiMedicalBag, mdiCog } from '@mdi/js';


interface AppPage {
  url: string;

  mdiIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    mdiIcon: mdiHomeSilo
  },
  {
    title: 'Livestock',
    url: '/livestock',
    mdiIcon: mdiCow
  },
  {
    title: 'Veterinary',
    url: '/veterinary',
    mdiIcon: mdiMedicalBag
  },
  {
    title: 'Feed',
    url: '/feed',
    mdiIcon: mdiSilo
  },
  {
    title: 'Harvest',
    url: '/harvest',
    mdiIcon: mdiBarley
  },
  {
    title: 'Machinery',
    url: '/machinery',
    mdiIcon: mdiTractor
  },
  {
    title: 'Diary',
    url: '/diary',
    mdiIcon: mdiNotebook
  },
  {
    title: 'Settings',
    url: '/settings',
    mdiIcon: mdiCog
  }
];

const labels = ['Bookmark',];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Farm-App</IonListHeader>
          <IonNote>powered by farmOS</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <Icon path={appPage.mdiIcon} size={1} />
                  <IonLabel>&nbsp;&nbsp;{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
