import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { LoginForm } from '../component/form/LoginForm';
import { RegistrationForm } from '../component/form/RegistrationForm';
import { selectIsRegistrationActive } from '../state/slices/authenticationSlice';
import { useAppSelector } from '../state/hooks';
import { getJwtToken } from '../utils/jwtUtils';

/** A Page for containig the login and registration form */
export const LoginPage = () => {

    const isRegistrationActive: boolean = useAppSelector(selectIsRegistrationActive);

    const [isLoading, setIsLoading] = useState(true)

    /** If we already have a token redirects to home page */
    useEffect(()=>{
        if(getJwtToken() !== null){
            window.location.replace('/')
        }
        else{
            setIsLoading(false);
        }
    },[])

    return(
    <>
        {isLoading ? <CircularProgress /> : 
        isRegistrationActive === false ? <LoginForm/> : <RegistrationForm/>}       
    </>
    )
}