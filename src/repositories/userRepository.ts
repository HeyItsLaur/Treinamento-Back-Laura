import User from '../models/user';

class UserRepository {
    private users: User[];

    constructor(){
        this.users = [];
    }

    public findUserByCPF(cpf: string){
        const findUser = this.users.find(user => user.cpf === cpf);
        
        return findUser || null;
    }

    public findUserIndex(id: string){
        const userIndex = this.users.findIndex(user => user.id == id);

        return userIndex;
    }
    
    public checkCPF(userIndex: number, cpf: string){
        if(this.users[userIndex].cpf === cpf)
        return 1;
        
        return null;
    }
    
    public findUserByID(id: string){
        const findUser = this.users.find(user => user.id === id);
        
        return findUser || null;
    }

    public changeUser(name: string, birthDate: string, cpf: string, cel: string, attDate: string, userIndex: number){
        this.users[userIndex].name = name;
        this.users[userIndex].birthDate = birthDate;
        this.users[userIndex].cpf = cpf;
        this.users[userIndex].cel = cel;

        return this.users[userIndex];
    }

    public filterDelete(id: string){
        this.users = this.users.filter((user) => user.id != id);

        return 0
    }

    public printUsers(){
        return this.users;
    }


    public create(name: string, birthDate: string, cpf: string, cel: string, createDate: string, attDate: string): User{
        const user = new User(name, birthDate, cpf, cel, createDate, attDate);

        this.users.push(user);

        return user;
    }

}

export default UserRepository;