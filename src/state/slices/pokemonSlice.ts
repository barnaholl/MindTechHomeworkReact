import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface PokemonState {
    currentType: string,
    ownedPokemons: string[],
    pokemonDetailName: string,
    isOwnedOnlyEnabled: boolean,
    searchQuery: string,
}

const initialState: PokemonState = {
    currentType: "normal",
    ownedPokemons: [],
    pokemonDetailName: "",
    isOwnedOnlyEnabled: false,
    searchQuery: ""
}

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        setCurrentType: (state: PokemonState, action: PayloadAction<string>) => {
            state.currentType = action.payload
        },
        setOwnedPokemons: (state: PokemonState, action: PayloadAction<string[]>) => {
            state.ownedPokemons = action.payload
        },
        setPokemonDetailName: (state: PokemonState, action: PayloadAction<string>) => {
            state.pokemonDetailName = action.payload
        },
        removePokemonDetailName: (state: PokemonState) => {
            state.pokemonDetailName = ""
        },
        setIsOwnedOnlyEnabled: (state: PokemonState, action: PayloadAction<boolean>) => {
            state.isOwnedOnlyEnabled = action.payload
        },
        setSearchQuery: (state: PokemonState, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
        }
    }
})

export const { 
    setCurrentType,
    setOwnedPokemons, 
    setPokemonDetailName, 
    removePokemonDetailName, 
    setIsOwnedOnlyEnabled, 
    setSearchQuery 
} = pokemonSlice.actions

export default pokemonSlice.reducer

export const selectPokemonCurrentType = (state: RootState) => state.pokemon.currentType
export const selectPokemonOwnedPokemons = (state: RootState) => state.pokemon.ownedPokemons
export const selectPokemonDetailName = (state: RootState) => state.pokemon.pokemonDetailName
export const selectIsOwnedOnlyEnabled = (state: RootState) => state.pokemon.isOwnedOnlyEnabled
export const selectSearchQuery = (state: RootState) => state.pokemon.searchQuery
