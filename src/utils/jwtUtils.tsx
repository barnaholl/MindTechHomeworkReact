export const getJwtToken = () => {
    return localStorage.getItem("jwtToken")
}

export const getAuthorizationConfig = () => {
    const jwtToken = getJwtToken()
    
    const config = {
        headers: { Authorization: `Bearer ${jwtToken}` }
    };

    return config
}