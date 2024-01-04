export interface Current{
    userId: string,
    userName: string,
    brand: string,
    model: string,
    location: string,
    pickup: Date,
    dropoff: Date,
    numOfDays: number,
    numSeat: number,
    rate: number,
}

export interface Previous{
    userId: string,
    userName: string,
    brand: string,
    model: string,
    location: string,
    pickup: Date,
    dropoff: Date,
    numOfDays: number,
    numSeat: number,
    rate: number,
}