import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { compassSharp, ellipse, heartSharp, list, square, triangle } from 'ionicons/icons';
import Pokedex from './pages/Pokedex';
import Favorites from './pages/Favorites';
import Tab3 from './pages/Tab3';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/react/css/palettes/dark.always.css';
import '@ionic/react/css/palettes/dark.class.css';
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import PokemonDetails from './components/PokemonDetails';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/pokedex">
            <Pokedex />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/pokemon/:id" component={PokemonDetails} />
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/pokedex" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="pokedex" href="/pokedex">
            <IonIcon aria-hidden="true" icon={compassSharp} />
            <IonLabel>Pokedex</IonLabel>
          </IonTabButton>
          <IonTabButton tab="favorites" href="/favorites">
            <IonIcon aria-hidden="true" icon={heartSharp} />
            <IonLabel>Favorites</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
