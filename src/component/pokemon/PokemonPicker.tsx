import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { selectPokemonCurrentType, setCurrentType } from '../../state/slices/pokemonSlice';
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import axios from 'axios';
import { pokeApi } from '../../configuration/axiosConfig';
import { Box } from '@mui/system';

/** Dropdown where we can select the types of pokemons we would like to see */
export const PokemonPicker = () => {

    type PokemonTypeResponseType = {name: string, url: string}

    const dispatch = useAppDispatch();

    const pokemonTypesFromLocalStorage = JSON.parse(localStorage.getItem("pokemonTypes") || "[]")

    const [pokemonTypes, setPokemonTypes] = useState(pokemonTypesFromLocalStorage)

    const currentType: string = useAppSelector(selectPokemonCurrentType);

    /** Send a request to get the pokemon types if we did not store it in or localstorage */
    const fetchPokemonTypes = () => {
        if(pokemonTypes.length === 0){
            axios.get(pokeApi+"/type")
            .then(response => {setPokemonTypes(response.data.results.map((a:PokemonTypeResponseType) => a.name))})
        }
    }

    /** Set the currently chosen pokemon type  */
    const selectHandler = (event: SelectChangeEvent) => {
        dispatch(setCurrentType(event.target.value))
    }    

    useEffect(()=>{
        fetchPokemonTypes()
    },[])

    /** Store pokemonTypes in the localstorage, so it will not send unnecessary requests to pokeApi(it has a limit and I was afraid to reach it) */
    useEffect(()=>{
        localStorage.setItem("pokemonTypes", JSON.stringify(pokemonTypes))
    },[pokemonTypes])

     
    return(
        <Box sx={{display:"flex"}}>
        <Typography variant='h4'>Choose a type:</Typography>
            <Select
            id="typeSelector"
            autoWidth
            value={currentType}
            onChange={(event) => selectHandler(event)}
            >
            {pokemonTypes.map((pokemonType: String) => <MenuItem key={pokemonType.toString()} value={pokemonType.toString()}>{pokemonType}</MenuItem>)}
            </Select> 
        </Box>    
    )
}