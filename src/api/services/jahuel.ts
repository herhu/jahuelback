import API from '.'
import { asyncLocalStorage } from '../../utils'
import { IInventoryHotel, IUpdateDateInventory } from '../../interfaces/IInventory'

const api = new API();

export const getProgram = async () => api.get('/backoffice/program')
export const getInventory = async () => api.get('/backoffice/inventory')
export const saveInventory = async (post: IInventoryHotel) => api.post('/backoffice/inventory', post)
export const updateDateInventory = async (id: string, data: IUpdateDateInventory) => api.put(`/backoffice/inventory/${id}`, data)