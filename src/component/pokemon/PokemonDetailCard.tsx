import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, List, ListItem, Modal } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { backendApi, pokeApi } from "../../configuration/axiosConfig";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { removePokemonDetailName, selectPokemonDetailName, selectPokemonOwnedPokemons, setOwnedPokemons } from "../../state/slices/pokemonSlice";
import { getAuthorizationConfig } from "../../utils/jwtUtils";

/** An inspect/detail view of pokemons, it is a modal and opens up by setting the PokemonDetailName */
export const PokemonDetailCard = () => {

    type PokemonAbilityType = {ability:{name:string, url:string}, is_hidden: boolean}

    const dispatch = useAppDispatch();
    const name: string = useAppSelector(selectPokemonDetailName); 
    const ownedPokemonsList: string[] = useAppSelector(selectPokemonOwnedPokemons); 

    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false)

    const [imageUrl, setImageUrl] = useState("")
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [abilities, setAbilities] = useState([])

    const [isOwned, setIsOwned] = useState(false)

    /** Send a get request to the backend to get the list of owned pokemons, and set it globally*/
    const refreshOwnedPokemons = () => {
        axios.get(`${backendApi}/user/pokemon`, getAuthorizationConfig())
        .then(response => 
            dispatch(setOwnedPokemons(response.data.pokemonList)))
    }

    /** Send a patch request to the backend to add a new pokemon to the list of owned pokemons and trigger a refresh */
    const catchHandler = () => {
        axios.patch(backendApi+"/user/pokemon/add?pokemon="+name, {}, getAuthorizationConfig())
        .then(response => refreshOwnedPokemons())
        
    }

    /** Send a patch request to the backend to remove a pokemon from the list of owned pokemons and trigger a refresh */
    const releaseHandler = () => {    
        axios.patch(backendApi+"/user/pokemon/remove?pokemon="+name, {}, getAuthorizationConfig())
        .then(response => refreshOwnedPokemons())
    }

    /** Set the current pokemon to empty string so the card closes */
    const closeHandler = () => {
        dispatch(removePokemonDetailName())
    }
    
    /** Send a request to pokeApi and open up everytime we set the name to a new pokemon's name, closes if we set it to empty  */
    useEffect(()=>{
        if(name !== ""){
            axios.get(`${pokeApi}/pokemon/${name}`)
            .then(response => {       
                setImageUrl(response.data.sprites.front_default)
                setWeight(response.data.weight)
                setHeight(response.data.height)                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                setAbilities(response.data.abilities.filter((row:PokemonAbilityType) => row.is_hidden === false))              
            })
            .then(response2 => {
                setIsOpen(true)
                setIsLoading(false)                                             
            })}
        else{
            setIsOpen(false)            
        } 
    },[name])

    /** Reevaluate if current pokemon isOwned when the list of owned pokemons, or the current pokemon is changed */
    useEffect(()=>{
        ownedPokemonsList.includes(name) ? setIsOwned(true) : setIsOwned(false)
    },[ownedPokemonsList, name])

    return(
    <>
        <Modal
        open={isOpen}
        onClose={closeHandler}
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
        >
            {isLoading ? <CircularProgress /> :
            <Card >
                <CardMedia
                title={name}
                component="img"
                height="250"
                image={imageUrl}
                alt={name+ " image"}
                sx={{borderBottom:"black 1px solid"}} 
                />
                <CardContent>
                    <p>Name: {name}</p>
                    <p>Weight: {weight}</p>
                    <p>Height: {height}</p>
                    <p>Abilities:</p> 
                    <List disablePadding={true}>
                        {abilities.map((row: PokemonAbilityType) => <ListItem  key={row.ability.name}>{row.ability.name}</ListItem>)}
                    </List>
                </CardContent>
                <CardActions>
                    {isOwned ? 
                    <Button variant ='contained' onClick={releaseHandler}>Release</Button> : 
                    <Button variant ='contained' onClick={catchHandler}>Catch</Button>}
                </CardActions>
            </Card>
            }
        </Modal>    
    </>
    )

}