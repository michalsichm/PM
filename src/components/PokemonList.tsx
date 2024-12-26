import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow, IonSpinner } from "@ionic/react";
import axios from "axios";
import { useEffect, useState } from "react";

type Pokemon = {
    id: number
    name: string;
    imageUrl: string;
};

const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};

const PokemonList = () => {
    const [pokemonData, setPokemonData] = useState<Array<Pokemon>>([]);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=18');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPokemonData();
    }, []);

    const getPokemonData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(url);
            setUrl(response.data.next);
            const pokemonPromises = response.data.results.map(async (pokemon: { name: string; url: string }) => {
                const response = await axios.get(pokemon.url);
                const { id, name, sprites: { front_default } } = response.data;
                return { id, name: capitalizeFirstLetter(name), imageUrl: front_default };
            })
            const fetchedPokemons: Array<Pokemon> = await Promise.all(pokemonPromises);
            setPokemonData(prevPokemons => [...prevPokemons, ...fetchedPokemons]);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <IonSpinner name="crescent" />
                </div>
            ) : (
                <IonGrid fixed={true}>
                    <IonRow className="ion-justify-content-center">
                        {pokemonData.map(pokemon => (
                            <IonCol key={pokemon.id} size="6">
                                <IonCard routerLink={`/pokemon/${pokemon.id}`}>
                                    <img alt="Pokemon Image" src={pokemon.imageUrl} />
                                    <IonCardHeader>
                                        <IonCardTitle style={{ fontSize: 'clamp(14px, 8vw, 18px)' }}>
                                            {pokemon.name}
                                        </IonCardTitle>
                                    </IonCardHeader>
                                </IonCard>
                            </IonCol>
                        ))}
                        <IonButton onClick={getPokemonData}>More</IonButton>
                    </IonRow>
                </IonGrid>
            )}
        </>
    );

}


export default PokemonList;