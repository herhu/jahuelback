import { IRoom } from './IRoom'
import { IProgram } from './IProgram'

export interface IInventory {
    rooms: Array<IRoom>
    programs: Array<IProgram>
    description: String
    start: Date
    end: Date
    available: boolean
}