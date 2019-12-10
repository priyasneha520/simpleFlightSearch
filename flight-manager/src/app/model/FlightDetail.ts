export interface FlightDetail {
    position: number;

    flightNumber: number;
    carrier: string;
    origin: string;
    departure: Date;
    destination: string;
    arrival: Date;
    aircraft: string;
    distance: string;
    travelTime: string;
    status: string;
}