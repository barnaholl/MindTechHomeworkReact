import { Grid } from "@mui/material"

/** A Basic grid for rendering pokemon card */
export const PokemonCardContainer = (props: {cards: JSX.Element[]} ) => {
    return(
        <>
            <Grid container >
                {props.cards}
            </Grid>
        </>
    )
}