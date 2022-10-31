import { application, Router } from 'express';
import Pius from '../models/pius';
import UserRepository from '../repositories/userRepository';
import { usersRepository } from './user.routes';


const piuRoutes = Router();


let pius = [] as Pius[];


//criação de Pius
piuRoutes.post('/pius', (req, res) => {
    const{ userId, text, createDate, attDate } = req.body;

    const test = usersRepository.findUserByID(userId);

    if(!test)
        return res.status(404).json({ message: "User not found"});

    if(text == undefined)
        return res.status(400).json({message: "No text provided"});
    
    if(text.length > 140)
        return res.status(400).json({message: "Text exceeded 140 characters"});

    const piu = new Pius(userId, text, createDate, attDate);

    pius.push(piu);

    return res.json(piu);
})

//lista de pius

piuRoutes.get('/pius', (req, res)=>{
    return res.json(pius);
}
)

//busca por um piu pelo seu id

piuRoutes.get('/pius/:piuId', (req, res)=>{
    const { piuId } = req.params;

    const piu = pius.find(piu => piu.piuId == piuId);

    if(!piu)
        return res.status(404).json({ message: "Piu not found"});

    return res.json(piu);
})

piuRoutes.put('/pius/:piuId', (req, res)=>{
    const { text, attDate, userId} = req.body;
    const { piuId } = req.params;

    if(text == undefined)
        return res.status(400).json({message: "No text provided"});
    
    if(text.length > 140)
        return res.status(400).json({message: "Text exceeded 140 characters"});

    const piuIndex = pius.findIndex(piu => piu.piuId == piuId);

    if(piuIndex === -1)
    return res.status(404).json({ message: "Piu not found"});

    pius[piuIndex].text = text;

    return res.json(pius[piuIndex]);

})

piuRoutes.delete('/pius/:piuId', (req, res)=>{
    const { piuId } = req.params;

    const piu = pius.find(piu => piu.piuId == piuId);

    if(!piu)
        return res.status(404).json({ message: "Piu not found"});
    
    pius = pius.filter((piu) => piu.piuId != piuId);

    return res.json({message: "Piu Deleted"})
})

export default piuRoutes;