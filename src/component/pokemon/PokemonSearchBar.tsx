import { TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch } from "../../state/hooks";
import { setSearchQuery } from "../../state/slices/pokemonSlice";

/** Searchbar for filter our rendered pokemons by name */
export const PokemonSearchBar = () => {

    const DEBOUNCE_TIME = 500

    const dispatch = useAppDispatch(); 

    const [query, setQuery] = useState("")
    
    /** Set query based on user input */
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuery(event.target.value)
    }

    /** Set the search query after untouched for DEBOUNCE_TIME*/
    useEffect(()=>{
        const getData = setTimeout(()=>{
            dispatch(setSearchQuery(query))
        }, DEBOUNCE_TIME)

        return () => clearTimeout(getData)
    },[query])

    return(
        <>
            <Box sx={{display:"flex"}}>
                <Typography variant="h4">Name:</Typography>
                <TextField
                id="search-bar"
                label="Search"
                value={query}
                onChange={(event)=> handleChange(event)}
                />  
            </Box>    
        </>
    )
}
