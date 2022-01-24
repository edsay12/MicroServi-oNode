import express from 'express';
import statusRout from './routes/status';
import userRoute from './routes/userRout';
import db from './db'
const app = express();
const port = 8081



// Configurações para as rotas 
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//Rotas 

app.use(userRoute)
app.use(statusRout)

//Server
app.listen(port,()=>{
    console.log(`server iniciado na porta:${port}`);
});
