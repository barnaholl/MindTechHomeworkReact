import { Alert, AlertTitle, Box, Button, FormControl, Input,  InputLabel, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios'
import ErrorIcon from '@mui/icons-material/Error';
import { backendApi } from '../../configuration/axiosConfig';
import { useAppDispatch } from '../../state/hooks';
import { setIsRegistrationActive } from '../../state/slices/authenticationSlice';

export const RegistrationForm = () => {

    const [alertActive, setAlertActive] = useState(false)

    const dispatch = useAppDispatch();

    /**Send registration request to backend, if username is taken open an alert, else add jwt token to localstorage and redirect to homepage*/
    const registrationHandler = (userCredentials: {            
        username: string,
        password: string
    }) => {    
        axios.post(`${backendApi}/auth/registration`, userCredentials)
        .then(response => {
            if(response.data.token === 'Username is already taken'){
                setAlertActive(true)
            }
            else{
                localStorage.setItem('jwtToken', response.data.token)
                window.location.replace('/')
            }
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    /** IsRegistrationActive is a flag for showing the registration form insted of the login one */
    const signInHandler = () => {   
        dispatch(setIsRegistrationActive(false))
    }
  
    /** criteria of formik's form validation */
    const validationSchema = Yup.object({
        username: Yup
        .string()
        .required('Username is Required'),
        password: Yup
        .string()
        .required('Password is Required'),
        passwordAgain: Yup
        .string()
        .required('Password confirmation is Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    /** a custom hook that will return Formik state and helpers  */
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordAgain: ''
        },
        validationSchema : validationSchema,
        onSubmit: (values) => {
            registrationHandler({
                username: values.username,
                password: values.password
            })
        },
    })

    return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            {alertActive ? 
            <Alert onClose={() => setAlertActive(false)} variant="filled" severity="error">
                <AlertTitle>Registration error</AlertTitle>
                Username is already in use
            </Alert> :
            null
            }
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircleIcon sx={{ color: 'action.active', mr: 0.5, my: 1 }} />
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
                    <LockOpenIcon sx={{ color: 'action.active', mr: 0.5, my: 1 }} />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel>Password</InputLabel>
                    <Input
                        id="password"
                        type={'password'}
                        {...formik.getFieldProps('password')}
                    />
                    </FormControl>
                    {formik.errors.password && formik.touched.password ? 
                        <Tooltip title={formik.errors.password}>
                            <ErrorIcon sx={{ color: 'red', mr: -3, my: 1 }}/> 
                        </Tooltip>
                    : null
                    }
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <LockOpenIcon sx={{ color: 'action.active', mr: 0.5, my: 1 }} />
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel>Confirm password</InputLabel>
                    <Input
                        id="passwordAain"
                        type={'password'}
                        {...formik.getFieldProps('passwordAgain')}
                    />
                    </FormControl>
                    {formik.errors.passwordAgain && formik.touched.passwordAgain? 
                        <Tooltip title={formik.errors.passwordAgain}>
                            <ErrorIcon sx={{ color: 'red', mr: -3, my: 1 }}/> 
                        </Tooltip>
                    : null
                    }
                </Box>
                <Box>
                    <Button 
                        variant ='contained' 
                        color='primary' 
                        type="submit" >Registration</Button>
                    <Button 
                        color='primary' 
                        onClick={signInHandler}>Sign in</Button>
                </Box>
            </Box>
        </form>
    </div>
    )
}