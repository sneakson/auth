export class User{
    id: number = null;
    username: string = '';
    password: string = '';
    email: string = '';
    phone: string = '';

    constructor(other: User){
        this.id = other?.id;
        this.username = other?.username;
        this.password = other?.password;
        this.email = other?.email;
        this.phone = other?.phone;
    }
}