export interface IUser{
    name : string,
    email : string,
    password : string,
    age : number,
    is_active? : boolean
}
export type IUpdateUser = Partial<IUser>;