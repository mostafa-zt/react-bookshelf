export interface IUserValidation {
    email: { validation: { required: boolean }, isValid: boolean, touched: boolean };
    password: { validation: { required: boolean }, isValid: boolean, touched: boolean };
}

export interface IUserLogin {
    email: string;
    password: string;
}

export class UserFromValues implements IUserLogin {
    constructor(init?: IUserLogin) {
        Object.assign(this, init);
    }
    email: string = '';
    password: string = '';
}

export interface IUserLoginResponse {
    token: string;
    success: boolean;
    expiresIn: number;
    messages: { param: string, msg: string }[];
    email: string;
}

