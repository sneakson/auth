export class User{
    id: number = null;
    username: string = '';
    password: string = '';

    constructor(other: User){
        this.id = other.id;
        this.username = other.username;
        this.password = other.password;
    }
}