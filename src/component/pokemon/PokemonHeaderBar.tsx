import { Grid } from "@mui/material"
import { PokemonPicker } from "./PokemonPicker"
import { PokemonSearchBar } from "./PokemonSearchBar"
import { ShowOnlyOwnedCheckBox } from "./ShowOnlyOwnedCheckbox"

/** Aggregate the filtering components to a header component */
export const PokemonHeaderBar = () => {
    return(
        <>
        <Grid container style={{width: '100%'}}>
            <Grid><PokemonPicker/></Grid>
            <Grid><PokemonSearchBar/></Grid>
            <Grid><ShowOnlyOwnedCheckBox/></Grid>
        </Grid>
        </>
    )
}

