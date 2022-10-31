import { uuid } from "uuidv4";

class User {
    id: string;

    name: string;

    birthDate: string;

    cpf: string;

    cel: string;

    createDate: string;

    attDate: string;

    constructor(name: string, birthDate: string, cpf: string, cel: string, createDate: string, attDate: string){
        this.id = uuid();
        this.name = name;
        this.birthDate = birthDate;
        this.cpf = cpf;
        this.cel = cel;
        this.createDate = createDate;
        this.attDate = attDate;
    };

}

export default User;