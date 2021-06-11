
export const getHeader = () => {
    let token = localStorage.getItem('gimAppMabc')
    return {'Content-Type':'application/json', 'Authorization':`Bearer ${token}`}
}