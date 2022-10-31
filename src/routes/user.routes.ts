import { Router } from 'express';
import UserRepository from '../repositories/userRepository';

const userRoutes = Router();

export const usersRepository = new UserRepository();

//Criação de usuarios

userRoutes.post('/users', (req, res) => {
    const { name, birthDate, cpf, cel, createDate, attDate } = req.body;

    if(usersRepository.findUserByCPF(cpf) !== null)
        return res.status(400).json({ message: " User with this CPF already exists"});
        
    if( name == undefined)
        return res.status(400).json({ message: "Provide name"});
        
    if(birthDate == undefined)
        return res.status(400).json({ message: "Provide birth date"});

    if(cpf == undefined)
        return res.status(400).json({ message: "Provide CPF"});
        
    if(cel == undefined)
        return res.status(400).json({ message: "Provide phone number"});

    const user = usersRepository.create(name, birthDate, cpf, cel, createDate, attDate);

    return res.json(user);
});

//lista de usuarios

userRoutes.get('/users', (req, res)=> {
    const userPrint = usersRepository.printUsers();

    return res.json(userPrint);
});

//busca por 1 usuario pelo id

userRoutes.get('/users/:id', (req, res)=> {
    const { id } = req.params;

    const user = usersRepository.findUserByID(id);

    if(!user)
        return res.status(404).json({ message: "User not found"});


    return res.json(user);
})

userRoutes.put('/users/:id', (req, res)=> {
    const { name, birthDate, cpf, cel, attDate, createDate} = req.body;
    const { id } = req.params;

    const test = usersRepository.findUserByID(id);

    if(!test)
        return res.status(404).json({ message: "User not found"});
    
    if( name == undefined)
        return res.status(400).json({ message: "Provide name"});
        
    if(birthDate == undefined)
        return res.status(400).json({ message: "Provide birth date"});

    if(cpf == undefined)
        return res.status(400).json({ message: "Provide CPF"});
        
    if(cel == undefined)
        return res.status(400).json({ message: "Provide phone number"});

    if(usersRepository.findUserByCPF(cpf) !== null)
        if(usersRepository.checkCPF(usersRepository.findUserIndex(id), cpf) === null)
            return res.status(400).json({ message: " User with this CPF already exists"});


    usersRepository.changeUser(name, birthDate, cpf, cel, attDate, usersRepository.findUserIndex(id));

    const toReturn = {
        name,
        birthDate,
        cpf,
        cel,
        createDate,
        attDate
    }

    return res.json(toReturn);
})

userRoutes.delete('/users/:id',(req, res)=>{
    const { id } = req.params;

    if(usersRepository.findUserByID(id) === null)
        return res.status(404).json({ message: "User not found"});

    usersRepository.filterDelete(id);

    return res.json({message: "User deleted"})

})

export default userRoutes;
