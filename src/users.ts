export type Role = 'admin' | 'member'

export interface IUser {
    username: string;
    password: string;
    role: Role
};

export const users: IUser[] = [
    {
        username: 'user1',
        password: 'Passw0rdAdmin',
        role: 'admin'
    }, {
        username: 'anna',
        password: 'Passw0rdMember',
        role: 'member'
    }
];