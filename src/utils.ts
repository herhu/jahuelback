export const isEmpty = (obj: object) => {
    if (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) return false
        }
        return true
    }
    return false
}

export const errorResponse = (error: any, name: string) => {
    if (error) {
        if (error) {
            if (error.response.data.description) {
                console.log(`${name}: ${error.response.data.description}`)
            } else {
                console.log(`${name}: ${error.message}`)
            }
        } else {
            console.log(`${name}: ${error.message}`)
        }
    }
}

export const asyncLocalStorage = {
    setItem: async (key: any, value: any) => {
        await null;
        return localStorage.setItem(key, value);
    },
    getItem: async (key: any) => {
        await null;
        return localStorage.getItem(key);
    }
};