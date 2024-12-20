import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from "@ionic/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

type PokemonDetails = {
    name: string;
    imageUrl: string;
};

const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};

const PokemonList = () => {
    const [pokemonData, setPokemonData] = useState<Array<PokemonDetails>>([]);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=18');

    useEffect(() => {
        async function getPokemonData() {
            const response = await axios.get(url);
            setUrl(response.data.next);
            const pokemonPromises = response.data.results.map(async (pokemon: { name: string; url: string }) => {
                const response = await axios.get(pokemon.url);
                const { name, sprites: { front_default } } = response.data;
                return { name: capitalizeFirstLetter(name), imageUrl: front_default };
            })
            // add error check
            const pokemons: Array<PokemonDetails> = await Promise.all(pokemonPromises);
            console.log(pokemons);
            setPokemonData(pokemons);
        }
        getPokemonData();
    }, [])


    // return (
    //     <>
    //         <IonGrid fixed={true}>
    //             {pokemonData.map((pokemon, index) => {
    //                 // Create a new row after every 3 items
    //                 if (index % 3 === 0) {
    //                     return (
    //                         <IonRow key={index}>
    //                             {/* Map 3 pokemon per row */}
    //                             {[0, 1, 2].map((colIndex) => {
    //                                 const pokemonItem = pokemonData[index + colIndex];
    //                                 if (pokemonItem) {
    //                                     return (
    //                                         <IonCol key={colIndex} size="4">
    //                                             <IonCard>
    //                                                 <img alt="Pokemon Image" src={pokemonItem.imageUrl} />
    //                                                 <IonCardHeader>
    //                                                     <IonCardTitle>{pokemonItem.name}</IonCardTitle>
    //                                                 </IonCardHeader>
    //                                             </IonCard>
    //                                         </IonCol>
    //                                     );
    //                                 }
    //                                 return null;
    //                             })}
    //                         </IonRow>
    //                     );
    //                 }
    //                 return null;
    //             })}
    //         </IonGrid>

    //     </>
    // );
    return (
        <>
            <IonGrid fixed={true}>
                <IonRow>
                    {pokemonData.map((pokemon, index) => (
                        <IonCol key={index} size="6">
                            <IonCard>
                                <img alt="Pokemon Image" src={pokemon.imageUrl} />
                                <IonCardHeader>
                                    <IonCardTitle>{pokemon.name}</IonCardTitle>
                                </IonCardHeader>
                            </IonCard>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>

        </>

    );

}


export default PokemonList;