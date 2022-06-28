import { default as axios, AxiosRequestConfig } from 'axios';
import { IInventoryHotel } from '../../interfaces/IInventory'
const instance = axios.create({
    baseURL: 'https://pagos.jahuel.cl/api/v1'
    //  baseURL: 'http://localhost:9000/v1'
});


const generateHeaders = (params?: number): AxiosRequestConfig => {

    try {
        const minTokenLength = 1;
        const token = localStorage.getItem('TOKEN')
        // Abort if not string
        if (typeof token !== 'string') throw new Error('User info not found');


        // Abort if token is not string and min length
        if (!(typeof token === 'string' && token.length >= minTokenLength)) {
            throw new Error('Invalid user access token');
        }

        const requestConfig: AxiosRequestConfig = {
            params, headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        };
        return requestConfig

    } catch (error) {
        console.log(error, 'from generateHeaders')
        return {};
    }
}

export default class API {

    get(url: string, params?: number) {
        return instance.get(url, generateHeaders(params))
    }
    post(url: string, body?: object) {
        return instance.post(url, body, generateHeaders())
    }
    put(url: string, body?: object) {
        return instance.put(url, body, generateHeaders())
    }
    patch(url: string, body: object) {
        return instance.patch(url, body, generateHeaders())
    }
    delete(url: string) {
        return instance.delete(url, generateHeaders())
    }
}
