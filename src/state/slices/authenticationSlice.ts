import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getJwtToken } from '../../utils/jwtUtils';
import { RootState } from '../store';

export interface AuthenticationState {
    isLoggedIn: boolean,
    isRegistrationActive: boolean 
}

const initialState: AuthenticationState= {
    isLoggedIn: getJwtToken() !== null,
    isRegistrationActive: false
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setIsLoggedIn: (state: AuthenticationState, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
        setIsRegistrationActive: (state: AuthenticationState, action: PayloadAction<boolean>) => {
            state.isRegistrationActive = action.payload
        }
    }
});

export const { setIsLoggedIn, setIsRegistrationActive } = authenticationSlice.actions
export default authenticationSlice.reducer

export const selectIsLoggedIn = (state: RootState) => state.authentication.isLoggedIn
export const selectIsRegistrationActive = (state: RootState) => state.authentication.isRegistrationActive
