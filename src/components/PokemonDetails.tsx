import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import axios from "axios";
import { heart } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import useStorage from "../hooks/useStorage";

interface PokemonDetailPageProps
    extends RouteComponentProps<{
        id: string;
    }> { }


type Pokemon = {
    id: number
    name: string;
    imageUrl: string;
    weight: number;
    height: number;
    types: Array<string>;
};


const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};

const PokemonDetails: React.FC<PokemonDetailPageProps> = ({ match }) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const { favorites, addFavorite, removeFavorite } = useStorage();
    const [favorite, setFavorite] = useState(false);
    const url = `https://pokeapi.co/api/v2/pokemon/${match.params.id}`;

    useEffect(() => {
        const getDetails = async () => {
            const response = await axios.get(url);
            const { id, name, weight, height, sprites: { front_default }, types } = response.data;
            setPokemon({
                id, name: capitalizeFirstLetter(name), imageUrl: front_default,
                weight: weight / 10, height: height * 10,
                types: types.map((t: any) => t.type.name)
            });
        }
        getDetails();
    }, [url, favorites]);


    useEffect(() => {
        setFavorite(favorites.includes(parseInt(match.params.id)));
        // console.log(favorites);
    }, [favorites]);


    const handleFavorite = () => {
        if (!favorite) {
            addFavorite(parseInt(match.params.id));
            console.log("added favorite")
            return;
        }
        removeFavorite(parseInt(match.params.id));
        console.log("removed favorite");
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{pokemon?.name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <IonCard>
                        <img alt="Pokemon Image" src={pokemon?.imageUrl} style={{ width: '150px', height: 'auto' }} />
                        <IonCardContent>Weight: {pokemon?.weight} kg</IonCardContent>
                        <IonCardContent>Height: {pokemon?.height} cm</IonCardContent>
                        <IonCardContent>Type: {pokemon?.types.join("/")}</IonCardContent>
                        <IonButton onClick={handleFavorite}>
                            <IonIcon icon={heart} style={{ color: favorite ? 'red' : 'black' }}></IonIcon>
                        </IonButton>
                    </IonCard>
                </IonContent>
            </IonPage>
        </div>
    );
}


export default PokemonDetails;