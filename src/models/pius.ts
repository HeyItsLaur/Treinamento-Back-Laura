import { uuid } from "uuidv4";

class Pius {
    piuId: string;

    userId: string;

    text: string;

    createDate: string;

    attDate: string;

    constructor(userId: string, text: string, createDate: string, attDate: string){
        this.piuId = uuid();
        this.userId = userId;
        this.text = text;
        this.createDate = createDate;
        this.attDate = attDate;
    };

}

export default Pius;