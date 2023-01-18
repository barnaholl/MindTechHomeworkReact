import { FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import { selectIsOwnedOnlyEnabled, setIsOwnedOnlyEnabled } from "../../state/slices/pokemonSlice";

/** Checkbox that filters for only our owned pokemons */
export const ShowOnlyOwnedCheckBox = () => {

    const isOwnedOnlyEnabled: boolean = useAppSelector(selectIsOwnedOnlyEnabled);

    const dispatch = useAppDispatch();

    /** Set the checkbox's state  */
    const checkHandler = () => {
        isOwnedOnlyEnabled ? dispatch(setIsOwnedOnlyEnabled(false)) : dispatch(setIsOwnedOnlyEnabled(true)) 
    }

    return(
        <>
            <FormGroup>
                <FormControlLabel control={
                    <Checkbox
                        checked={isOwnedOnlyEnabled}
                        onChange={checkHandler}
                    />
                } 
                label="Owned" />
            </FormGroup>
        </>
    )
}

