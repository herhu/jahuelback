import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

interface userLogged {
    username: string,
    email: string,
    token: string
}

export const signIn = async (email: string, password: string) => {
    return instance.post('/auth/signin', {
        email,
        password
    })
}

export const getInventory = async () => instance.get('/backoffice/inventory')
