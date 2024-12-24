import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";

const useStorage = () => {
    const [store, setStore] = useState<Storage>();
    const [favorites, setFavorites] = useState<Array<number>>([]);

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'pokedexdb'
            });
            const store = await newStore.create();
            setStore(store);

            const storedFavorites = await store.get('favorites') || [];
            setFavorites(storedFavorites);
        }
        initStorage();
    }, []);


    const addFavorite = (newFavorite: number) => {
        setFavorites((favorites) => {
            const updatedFavorites = [...favorites, newFavorite];
            store?.set('favorites', updatedFavorites);
            console.log(updatedFavorites);
            return updatedFavorites;
        });

    }

    const removeFavorite = (remove: number) => {
        setFavorites((favorites) => {
            const updatedFavorites = favorites.filter(fav => fav !== remove);
            store?.set('favorites', updatedFavorites);
            console.log(updatedFavorites);
            return updatedFavorites;
        })
    }

    return {
        favorites,
        addFavorite,
        removeFavorite,
    }
}


export default useStorage;