import { Card, CardContent } from "@mui/material"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectPokemonOwnedPokemons, setPokemonDetailName } from "../../state/slices/pokemonSlice";
/** Represent a list element of the currently rendered pokemons */
export const PokemonCard = (props:{name:string}) => {

    const dispatch = useAppDispatch(); 

    const ownedPokemonsList: string[] = useAppSelector(selectPokemonOwnedPokemons); 

    const [border, setBorder] = useState("")

    /** Set pokemonDetailName in the inspect/details card */
    const detailsHandler = () => {
        dispatch(setPokemonDetailName(props.name))
    }

    /**If there is any change in ownedPokemonsList set the border accoringly*/
    useEffect(()=>{
        ownedPokemonsList.includes(props.name) ? 
            setBorder("1px solid green") : setBorder("")

    },[ownedPokemonsList])

    return(
        <Card onClick={detailsHandler} sx ={{width: 300, border:border}} >
            <CardContent sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <h1>{props.name}</h1>
            </CardContent>
        </Card>
    )
}