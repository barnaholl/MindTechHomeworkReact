import axios from 'axios';
import { useEffect, useLayoutEffect, useState } from 'react';
import { PokemonCard } from '../component/pokemon/PokemonCard';
import { PokemonCardContainer } from '../component/pokemon/PokemonCardContainer';
import { backendApi, pokeApi } from '../configuration/axiosConfig';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { selectIsOwnedOnlyEnabled, selectPokemonCurrentType, selectPokemonOwnedPokemons, selectSearchQuery, setOwnedPokemons } from '../state/slices/pokemonSlice';
import { CircularProgress } from '@mui/material';
import { PokemonDetailCard } from '../component/pokemon/PokemonDetailCard';
import { getAuthorizationConfig, getJwtToken } from '../utils/jwtUtils';
import { PokemonHeaderBar } from '../component/pokemon/PokemonHeaderBar';

/** Home page for filter and render our pokemons */
export const HomePage = () => {

    type TypeResponseType = {
        pokemon: {
            name: string,
            url: string,
        },
        limit: number
    }

    const currentType: string = useAppSelector(selectPokemonCurrentType);
    const isOwnedOnlyEnable: boolean = useAppSelector(selectIsOwnedOnlyEnabled);
    const ownedPokemons: string[] = useAppSelector(selectPokemonOwnedPokemons);
    const searchQuery: string = useAppSelector(selectSearchQuery)

    const dispatch = useAppDispatch();

    const pokemonsByTypeFormLocalStorage = JSON.parse(localStorage.getItem(currentType) || "[]");

    const [currentPokemons, setCurrentPokemons] = useState(pokemonsByTypeFormLocalStorage);
    const [isLoading, setIsLoading] = useState(true);
    const [isRedirectCheck, setIsRedirectCheck] = useState(true)

    /** If we do not have a jwtToken rediredcts to login page */
    useLayoutEffect(()=>{
        if(getJwtToken() === null){
            window.location.replace('/login')
        }
        else{
            setIsRedirectCheck(false)
        }
    },[])
   
    /** 
     * Send a get request to pokeApi to get pokemons by current type and store the answer in localstorage.
     *  If it is already stored fetch it from localstorage
     */
    useEffect(() => {
        if(JSON.parse(localStorage.getItem(currentType) || "[]").length === 0 ){
            axios.get(`${pokeApi}/type/${currentType}`)
            .then(res => {
                const response = res.data.pokemon.map((row: TypeResponseType) => row.pokemon.name)
                setCurrentPokemons(response)
                localStorage.setItem(currentType, JSON.stringify(response))
            })
        }
        else{
            setCurrentPokemons(JSON.parse(localStorage.getItem(currentType) || "[]"))
        }
        setIsLoading(false)
    },[currentType])

    /** Send a get request to the backend and initialize the owned pokemos list */
    useEffect(()=>{
        axios.get(`${backendApi}/user/pokemon`, getAuthorizationConfig())
        .then(response => dispatch(setOwnedPokemons(response.data.pokemonList)))
    },[])

    
    /** Filter the pokemos by isOwnedOnlyEnable checkbox and the search query */
    const filteredPokemons = () : string[] => {
        let pokemons: string[] = currentPokemons
        if(isOwnedOnlyEnable){
            pokemons=ownedPokemons
        }
        return pokemons.filter(pokemon => pokemon.toLocaleLowerCase().includes(searchQuery.toLowerCase()))
    }

    return(
    <>
        {isLoading || isRedirectCheck ? <CircularProgress /> : 
        <>
            <PokemonHeaderBar/>
            <PokemonCardContainer cards = {
                filteredPokemons()
                .map((pokemon: string) => <PokemonCard key={pokemon} name={pokemon}/>)}/>
            <PokemonDetailCard/>
        </>        
        }
    </>
    )
}