import { AppBar, Grid, IconButton, Toolbar, Tooltip } from "@mui/material"
import { Box } from "@mui/system"
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { getJwtToken } from "../utils/jwtUtils";

/** Navbar for navigation purposes */
export const Navbar = () => {

    const loginHandler = () => {
        window.location.replace('/login')
    }

    const logoutHandler = () => {
        localStorage.removeItem("jwtToken")
        window.location.replace('/login')
    }

    const loginIcon = 
    <Tooltip title="Login">
        <IconButton onClick={loginHandler}><LoginIcon fontSize="large" style={{ color: 'white' }}/></IconButton>
    </Tooltip>

    const logoutIcon = 
    <Tooltip title="Logout">
        <IconButton onClick={logoutHandler}><LogoutIcon fontSize="large" style={{ color: 'white' }}/></IconButton>
    </Tooltip>

    return(
    <>
        <Box sx={{ flexGrow: 1, marginBottom : '1rem' }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container style={{width: '100%'}}>
                        <Grid item xs={11.6}></Grid>
                        <Grid item xs={0.4}>
                            {getJwtToken() !== null ? logoutIcon : loginIcon}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    </>
    )
}
  