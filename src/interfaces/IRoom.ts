export interface IRoom {
    name: string;
    description: string;
    inventory: number;
    available: number;
    sold: number
}

export interface IroomOracle {
    ROOM_TYPE: string
    RATE_CODE: string
    DESCRIPTION: string
    BEGIN_DATE: Date
    END_DATE: Date
    MONDAY: string
    TUESDAY: string
    WEDNESDAY: string
    THURSDAY: string
    FRIDAY: string
    SATURDAY: string
    SUNDAY: string
    SINGLE: number
    DOUBLE: number
    INVENTORY?: number
    AVAILABLE?: number;
    SOLD: number
}