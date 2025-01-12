import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact,  } from '@ionic/react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { IonReactHashRouter } from '@ionic/react-router'
import Menu from './components/Menu';
import HomePage from './pages/HomePage';
import LivestockPage from './pages/LivestockPage';
import VeterinaryPage from './pages/VeterinaryPage';
import FeedPage from './pages/FeedPage';
import HarvestPage from './pages/HarvestPage';
import EquipmentPage from './pages/EquipmentPage';
import DiaryPage from './pages/DiaryPage';
import SettingsPage from './pages/SettingsPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactHashRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
          <Route path="/" exact={true}>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact={true} component={HomePage} />
            <Route path="/livestock" exact={true} component={LivestockPage} />
            <Route path="/veterinary" exact={true} component={VeterinaryPage} />
            <Route path="/feed" exact={true} component={FeedPage} />
            <Route path="/harvest" exact={true} component={HarvestPage} />
            <Route path="/equipment" exact={true} component={EquipmentPage} />
            <Route path="/diary" exact={true} component={DiaryPage} />
            <Route path="/settings" exact={true} component={SettingsPage} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactHashRouter>
    </IonApp>
  );
};

export default App;