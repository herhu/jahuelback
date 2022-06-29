import { IroomOracle } from './IRoom'


export interface IInventoryHotel {
    active: boolean
    text: string
    id: string
    backColor?: string
    program: string
    start: string
    end: string
    rooms: Array<IroomOracle>
}

export interface IInventoryHotelDate {
    active: boolean
    text: string
    id: string
    backColor?: string
    program: string
    start: { value: string }
    end: { value: String }
    rooms: Array<IroomOracle>
}

export interface IUpdateDateInventory {
    start: string
    end: string
}

export interface IUpdateStatusInventory {
    active: boolean
}

export interface IUpdateAvailabilityInventory {
    AVAILABLE: number
    ROOM_TYPE: string
    INVENTORY: number
}