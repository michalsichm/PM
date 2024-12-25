import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Favorites.css';
import PokemonListFavorites from '../components/PokemonListFavorite';

const Favorites: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Favorites</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PokemonListFavorites></PokemonListFavorites>
        {/* <PokemonList></PokemonList> */}
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
