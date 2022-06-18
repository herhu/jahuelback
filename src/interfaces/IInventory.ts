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