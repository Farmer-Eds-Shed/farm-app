import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import { useState } from 'react';
import PurchasedTab from './LivestockTabs/LivestockPurchased';
import ActiveTab from './LivestockTabs/LivestockActive';
import SoldTab from './LivestockTabs/LivestockSold';
import MortalityTab from './LivestockTabs/LivestockMortality';

const LivestockPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'purchased' | 'active' | 'sold' | 'mortality'>('active');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonSegment value={selectedTab} onIonChange={e => setSelectedTab(e.detail.value as 'purchased' | 'active' | 'sold'| 'mortality')}>
          <IonSegmentButton value="active">
            <IonLabel>Active</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="purchased">
            <IonLabel>Purchased</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="sold">
            <IonLabel>Sold</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="mortality">
            <IonLabel>Mortality</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {selectedTab === 'active' && <ActiveTab />}
        {selectedTab === 'purchased' && <PurchasedTab />}
        {selectedTab === 'sold' && <SoldTab />}
        {selectedTab === 'mortality' && <MortalityTab />}
        
      </IonContent>
    </IonPage>
  );
};

export default LivestockPage;