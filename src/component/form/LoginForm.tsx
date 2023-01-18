import axios from "axios"
import { useState } from "react"
import { backendApi } from "../../configuration/axiosConfig"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { AlertTitle, Box, FormControl, InputLabel, Input, Tooltip, InputAdornment, IconButton, Button, Alert } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppDispatch } from "../../state/hooks";
import { setIsRegistrationActive } from "../../state/slices/authenticationSlice";

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [alertActive, setAlertActive] = useState(false)

    const dispatch = useAppDispatch();
    
    /**Send login request to backend, if username is not found then open an alert, else add jwt token to localstorage and redirect to homepage*/
    const loginAttempt = (loginCredentials: {            
        username: string,
        password: string
    }) => {    
        axios.post(`${backendApi}/auth/login`, loginCredentials)
        .then(response => {
            localStorage.setItem('jwtToken', response.data.token)
            window.location.replace('/');
        })
        .catch(() =>{
            setAlertActive(true)
        })
    }

    /** IsRegistrationActive is a flag for showing the registration form insted of the login one */
    const registrationHandler = () => {
        dispatch(setIsRegistrationActive(true))
    }

    /** toggle for showing passwword*/
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    /** criteria of formik's form validation */
    const validationSchema = Yup.object({
        username: Yup
        .string()
        .required('Required'),
        password: Yup
        .string()
        .required('Required')
    })

    /** a custom hook that will return Formik state and helpers  */
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema : validationSchema,
        onSubmit: (values) => {
            loginAttempt(values)
        },
    })

    return(
        <div>
        <form onSubmit={formik.handleSubmit}>
            {alertActive ? 
            <Alert onClose={() => setAlertActive(false)} variant="filled" severity="error">
                <AlertTitle>Login Error</AlertTitle>
                Bad username or password
            </Alert> :
            <div></div>
            }
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel>Username</InputLabel>
                        <Input
                        id="username"
                        {...formik.getFieldProps('username')} />
                        
                    </FormControl>
                    {formik.errors.username && formik.touched.username ? 
                        <Tooltip title={formik.errors.username}>
                            <ErrorIcon sx={{ color: 'red', mr: -3, my: 1 }}/> 
                        </Tooltip>
                    : null
                    }   
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="password"
                        type={showPassword ? 'text': 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        {formik.errors.password && formik.touched.password ? 
                        <Tooltip title={formik.errors.password}>
                            <ErrorIcon sx={{ color: 'red', mr: -3, my: 1 }}/> 
                        </Tooltip>
                        : null
                        }
                        </InputAdornment>
                        }
                        {...formik.getFieldProps('password')}
                    />
                    </FormControl>  
                </Box>
                <Box>
                    <Button 
                        variant ='contained' 
                        color='primary' 
                        type="submit" >Login</Button>
                    <Button 
                        color='primary' 
                        onClick={registrationHandler}>Registration</Button>
                </Box>
            </Box>
        </form>
    </div>
    )
}