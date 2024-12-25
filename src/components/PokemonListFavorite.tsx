import { useEffect, useRef, useState } from "react";
import useStorage from "../hooks/useStorage";
import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow, useIonViewWillEnter } from "@ionic/react";
import axios from "axios";


type Pokemon = {
    id: number
    name: string;
    imageUrl: string;
};

const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};

const PokemonListFavorites = () => {
    const { loadFavorites } = useStorage();
    const [pokemonData, setPokemonData] = useState<Array<Pokemon>>([]);

    useIonViewWillEnter(() => {
        const getData = async () => {
            const favorites = await loadFavorites();
            console.log(favorites);
            const pokemonPromises = favorites.map(async (favId) => {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${favId}`);
                const { id, name, sprites: { front_default } } = response.data;
                return { id, name: capitalizeFirstLetter(name), imageUrl: front_default };
            })
            // add error check
            const fetchedPokemons: Array<Pokemon> = await Promise.all(pokemonPromises);
            setPokemonData(fetchedPokemons);
        }
        getData();
    });


    return (
        <>
            <IonGrid fixed={true}>
                <IonRow className="ion-justify-content-center">
                    {pokemonData.map(pokemon => (
                        <IonCol key={pokemon.id} size="6">
                            <IonCard routerLink={`/pokemon/${pokemon.id}`}>
                                {/* <IonCard routerLink={`/pokemon/1`}> */}
                                <img alt="Pokemon Image" src={pokemon.imageUrl} />
                                <IonCardHeader>
                                    <IonCardTitle style={{ fontSize: 'clamp(14px, 8vw, 18px)' }}>
                                        {pokemon.name}
                                    </IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid >
        </>

    );

}

export default PokemonListFavorites;