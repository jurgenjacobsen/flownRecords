export { FlightRecordData, User, Permission };

interface FlightRecordData {
    [key: string]: any | undefined;
}

interface User {
    userId: string;
    email: string;
    password: string;
    username: string;
    permissions: Permission[];
    profileId: string | null;
    logbook: FlightRecordData[];
}

type Permission = 'ADMIN';