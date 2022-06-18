import { IroomOracle } from './IRoom'

export interface IProgram {
    name: String,
    description: String,
    single: number,
    double: number,
}

export interface IprogramOracle {
    PROGRAM: string,
    ROOMS: IroomOracle[]
}