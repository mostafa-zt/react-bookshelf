export interface IUserSignup {
    email: string;
    password: string;
    confirmPassowrd: string;
    name: string;
    lastname: string;
}

export interface IUserSignupValidation {
    email: { validation: { required: boolean }, isValid: boolean, touched: boolean };
    password: { validation: { required: boolean }, isValid: boolean, touched: boolean };
    confirmPassword: { validation: { required: boolean }, isValid: boolean, touched: boolean };
    name: { validation: { required: boolean }, isValid: boolean, touched: boolean };
    lastname: { validation: { required: boolean }, isValid: boolean, touched: boolean };
}

export class UserSignupFromValues implements IUserSignup {
    constructor(init?: IUserSignup) {
        Object.assign(this, init);
    }
    email: string = '';
    password: string = '';
    confirmPassowrd: string = '';
    name: string = '';
    lastname: string = '';
}

export interface IUserLoginResponse {
    token: string;
    success: boolean;
    expiresIn: number;
    messages: { param: string, msg: string }[];
    email: string;
}