export { FlightRecordData, User };

interface FlightRecordData {
    [key: string]: any | undefined;
}

interface User {
    userId: string;
    email: string;
    password: string;
    username: string;
    profileId: string | null;
    logbook: FlightRecordData[];
}