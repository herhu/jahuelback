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

export interface IUpdateDateInventory {
    start: string,
    end: string
}