import axios from "axios";
import { IInventoryHotel } from '../../interfaces/IInventory'
const instance = axios.create({
    baseURL: 'https://pagos.jahuel.cl/api/v1'
    // baseURL: 'http://localhost:9000/v1'
});


export const signIn = async (email: string, password: string) => {
    return instance.post('/auth/signin', {
        email,
        password
    })
}

export const getProgram = async () => instance.get('/backoffice/program')

export const getInventory = async () => instance.get('/backoffice/inventory')
export const saveInventory = async (post: IInventoryHotel) => instance.post('/backoffice/inventory', post)
