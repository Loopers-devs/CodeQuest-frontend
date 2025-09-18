export enum Roles {
    USER
}

export interface User {
    id: number;
    fullName: string;
    nickname: string | null;
    email: string;
    password: null;
    roles: Roles[];
    image: string | null;

    //TODO: Este campo debería ser boolean
    emailVerified: null;
    emailVerificationToken: null | string;
    emailVerificationTokenExpiry: null | Date;

    passwordResetToken: null | string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: null | Date;

}