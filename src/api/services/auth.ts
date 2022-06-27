import API from '../../api/services'
import { asyncLocalStorage } from '../../utils'
import { openNotificationWithIcon } from '../../components/Notification'

interface IUserLogin {
    email: string
    password: string
}

const api = new API();

export const login = async (data: IUserLogin) => {

    try {
        let response = await api.post('/auth/signin', data)

        if (response.data) {
            asyncLocalStorage.setItem('TOKEN', (response.data.token))
            asyncLocalStorage.setItem('USER', JSON.stringify(response.data.user))
            return true
        }
        console.log(response)

    } catch (error: any) {
        if (error.response.data) {
            openNotificationWithIcon('error', '', error.response.data.errors.message)
        } else {
            openNotificationWithIcon('error', '', error.message)
        }

        return false
    }
}

export const loadUser = async () => {
    const user = await asyncLocalStorage.getItem('USER')
    const token = await asyncLocalStorage.getItem('TOKEN')

    if (user && token) {
        return { user, token }
    }


}

export const isLoggedIn = () => {
    const user = localStorage.getItem("USER")
    const token = localStorage.getItem("TOKEN")
    if (user && token) {
        return true
    } else {
        return false
    }
}

export const recoverPassword = async (email: object) => {
    try {
        const response = await api.post('api/forgot-password', email)
        console.log(response)
    } catch (error) {
        return 'Ha ocurrido un error inesperado'
    }
}

export const logout = async () => {
    try {
        let response = await api.post('/auth/logout')
        if (response.status === 200) {
            localStorage.removeItem('TOKEN')
            localStorage.removeItem('USER')
            return true
        }

    } catch (error: any) {
        if (error.response.data) {
            openNotificationWithIcon('error', '', error.response.data.errors.message)
        } else {
            openNotificationWithIcon('error', '', error.message)
        }

        return false
    }

    // try {
    //     api.post('/auth/logout', {}).then((response) => {
    //         console.log('logout', response)

    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // } catch (error) {
    //     return false
    // }
}