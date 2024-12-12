import { Snowflake } from "./dataHandle";
import { User } from "./types";
import bcrypt from 'bcrypt';

const UserAuth = {
    newUserData: async ({
        username,
        email,
        password
    }: {
        username: string,
        email: string,
        password: string
    }): Promise<User | { message: string }> => { 
        if(typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string')
            return { message: 'Invalid data type' };

        let hashedPassword = await bcrypt.hash(password, 10);

        let UserData: User = {
            username,
            email,
            password: hashedPassword,
            logbook: [],
            userId: new Snowflake().generate(),
            profileId: null,
        };

        return UserData;
    }
}

export { UserAuth };