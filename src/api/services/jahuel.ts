import API from '.'
import { asyncLocalStorage } from '../../utils'
import { IInventoryHotel, IUpdateDateInventory, IUpdateStatusInventory, IUpdateAvailabilityInventory } from '../../interfaces/IInventory'

const api = new API();

export const getProgram = async () => api.get('/backoffice/program')
export const getInventory = async () => api.get('/backoffice/inventory')
export const saveInventory = async (post: IInventoryHotel) => api.post('/backoffice/inventory', post)
export const updateDateInventory = async (id: string, data: IUpdateDateInventory) => api.put(`/backoffice/inventory/date/${id}`, data)
export const updateStatusInventory = async (id: string, data: IUpdateStatusInventory) => api.put(`/backoffice/inventory/status/${id}`, data)
export const updateAvailabilityInventory = async (id: string, data: IUpdateAvailabilityInventory) => api.put(`/backoffice/inventory/availability/${id}`, data)
export const deleteInventory = async (id: string) => api.delete(`/backoffice/inventory/${id}`)