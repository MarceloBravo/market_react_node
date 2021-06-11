export const getTokenFromStorage = () => {
    if (localStorage.getItem('gimAppMabc')) {
        return localStorage.getItem('gimAppMabc')
    } else if (sessionStorage.getItem('gimAppMabc')) {
        return sessionStorage.getItem('gimAppMabc')
    } else {
        return null
    }
}