import { Drivers, Storage } from "@ionic/storage";
import { useEffect, useState } from "react";
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const useStorage = () => {
    const [store, setStore] = useState<Storage>();
    const [favorites, setFavorites] = useState<Array<number>>([]);

    useEffect(() => {
        const initStorage = async () => {
            const newStore = new Storage({
                name: 'pokedexdb',
                driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
            });
            await newStore.defineDriver(CordovaSQLiteDriver);

            const store = await newStore.create();
            setStore(store);

            const storedFavorites = await store.get('favorites') || [];
            setFavorites(storedFavorites);
        }
        initStorage();
    }, []);


    const loadFavorites = async () => {
        const storedFavorites: Array<number> = await store?.get('favorites') || [];
        // console.log(storedFavorites);
        return storedFavorites;
    };


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
        loadFavorites,
        addFavorite,
        removeFavorite,
    }
}


export default useStorage;